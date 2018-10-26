/* eslint no-eval: 0 */
import { observable } from 'mobx'
import Store from '../store/Store'
import socketIOClient from 'socket.io-client'
import axios from 'axios'

const socket = socketIOClient(Store.server)

class PageStore {
  @observable pages = []
  getPages = () => {
    this.getBoard()
    socket.on('update-board', (msg) => {
      console.log('update-board', msg)
      this.getBoard()
    })
  }
  getBoard = () => {
    let pages = []
    axios.get(Store.server + '/board/').then((res) => {
      res.data.map((board) =>
        pages.push({
          id: board._id,
          name: board.boardName,
          colorName: board.colorName
        })
      )
      Store.pages = pages
    })
  }

}
export default new PageStore()