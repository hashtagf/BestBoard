import { observable } from 'mobx'
var fs = require('fs')
//import socketIOClient from 'socket.io-client'

class LocalStore {
  @observable local = []
  insertPage(name) {
    this.local.pages.push({
      id: this.local.pages.length,
      name: name
    })
  }
  updatePage(index, id, name) {
    this.local.pages[index] = {
      id: id,
      name: name
    }
  }
  deletePage(index) {
    this.local.pages.peek(index, 1)
    console.log(this.local.pages)
  }
  insertDataSource(payload) {
    this.local.datasources.push({
      _id: this.local.datasources.length,
      datasource: payload
    })
  }
  updateDataSource(index, payload) {
    this.local.datasources[index] = {
      _id: index,
      datasource: payload
    }
  }
  insertWidget(id, payload) {
    var obj = {
      boardId: id,
      widget: payload
    }
    // console.log(fs)
    // fs.writeFile('widgets.json', JSON.stringify(obj), (err) => {
    //   if (err) {
    //     console.error(err)
    //     return
    //   };
    //   console.log("File has been created")
    // })
  }

}

export default new LocalStore()