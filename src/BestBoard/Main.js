import React, { Component } from 'react'
import './Main.css'
import LocalStore from '../store/LocalStore'
import Store from '../store/Store'
import socketIOClient from 'socket.io-client'
import Muuri from 'muuri'
import axios from 'axios'
import WidgetStore from '../store/WidgetStore'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactResizeDetector from 'react-resize-detector'
const socket = socketIOClient(Store.server)
var grid = null

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      listWidgets: [],
      connect: true,
      moveItems: []
    }
  }
  componentDidMount() {
    if (this.state.connect) this.response()
    else this.loadLocal()
  }
  loadLocal = () => {
    this.setState({
      listWidgets: LocalStore.local.widgets
    })
    WidgetStore.showWidgets(LocalStore.local.widgets[Store.currentId])
    this.createMuuri()
  }
  response = () => {
    this.getWidgets()
    socket.on('update-widget', (msg) => {
      console.log('update-widget', msg)
      this.getWidgets()
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
      this.createMuuri()
    })
  }

  createMuuri() {
    grid = new Muuri('.grid', {
      dragEnabled: true,
      dragContainer: document.body,
      dragStartPredicate: (item, e) => {
        if (e.distance > 10) {
          return Store.mode
        }
      },
      dragSort: function () {
        return [grid]
      }
    })
    grid.on('move', (data) => {
      // var toIndex = parseFloat(data.toIndex)
      // this.state.widgets.forEach((widget) => {
      //   if(parseFloat(widget.toIndex) === toIndex)
      //     toIndex = toIndex - 1
      // })
      // WidgetStore.updateIndexMuuri(data.item._element.dataset.id, toIndex)
      // this.state.moveItems.push({
      //   widgetId : data.item._element.dataset.id,
      //   toIndex: toIndex
      // })   
    })
    grid.on('showEnd', function (items) {
      console.log('End')
      items.forEach((item, index) => {
        WidgetStore.updateIndexMuuri(item._element.dataset.id, index)
      })
    })
  }

  componentWillUnmount() {
    console.log('Unmount')
    grid.show()
    grid.destroy(true)
  }
  onResize = () => {
    grid.refreshItems().layout()
  }

  render() {
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