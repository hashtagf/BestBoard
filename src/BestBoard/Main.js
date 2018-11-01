import React, { Component } from 'react'
import './Main.css'
import Store from '../store/Store'
import socketIOClient from 'socket.io-client'
import Muuri from 'muuri'
import axios from 'axios'
import WidgetStore from '../store/WidgetStore'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactResizeDetector from 'react-resize-detector'
import Skeleton from 'react-skeleton-loader'

const socket = socketIOClient(Store.server)

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      listWidgets: [],
      connect: true,
      moveItems: [],
      grid: null
    }
  }
  componentDidMount() {
    if (this.state.connect) this.response()
    else this.loadLocal()
  }
  response = () => {
    this.getWidgets()
    socket.on('update-widget', (msg) => {
      if (msg === 'new' ) {
        // this.state.grid.destroy()
        // this.setState({
        //   listWidgets: [],
        //   widgets: [],
        //   grid: null
        // })
        this.getWidgets()
      } else if (msg !== 'update-index') {
        this.getWidgets()
        this.state.grid.refreshItems()
      } 
    })
    socket.on('error', function (exception) {
      console.log('SOCKET ERROR', exception)
      socket.destroy()
    })
  }

  getWidgets() {
    axios.get(Store.server + '/widget/' + Store.currentId).then((res) => {
      let tmp = WidgetStore.showWidgets(res.data)
      this.setState({
        listWidgets: tmp,
        widgets: res.data
      })
      if (!this.state.grid) 
        this.createMuuri()
    })
  }

  createMuuri = () => {
    this.setState({
      grid: new Muuri('.grid', {
        dragEnabled: true,
        dragContainer: document.body,
        dragStartPredicate: (item, e) => {
          if (e.distance > 10) {
            return Store.mode
          }
        },
        dragSort: () => {
          return [this.state.grid]
        }
      })
    })
    this.state.grid.on('showEnd', function (items) {
      items.forEach((item, index) => {
       WidgetStore.updateIndexMuuri(item._element.dataset.id, index)
     })
    })
  }

  componentWillUnmount() {
    this.state.grid.show()
    // this.state.grid.destroy(true)
  }
  onResize = () => {
    this.state.grid.refreshItems().layout()
  }

  render() {
    console.log(this.state.grid)
    const listWidgets = this.state.listWidgets
    return (
      <div id="board">
        <ReactResizeDetector handleWidth skipOnMount refreshRate={10} onResize={this.onResize} />
        <ReactCSSTransitionGroup
          transitionName="maingrid"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
          <div className='grid row'>
            {listWidgets}
          </div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default Main