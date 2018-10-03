import React, { Component } from 'react'
import './Main.css'
import Store from '../store/Store'
import socketIOClient from 'socket.io-client'
import Muuri from 'muuri'
import axios from 'axios'
import WidgetStore from '../store/WidgetStore'

let server = 'http://172.18.6.7:5582'
const socket = socketIOClient(server)

var grid = null

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listWidgets: []
    }
  }

  componentDidMount() {
    this.createMuuri()
    this.response()
  }

  response = () => {
    this.getWidgets()
    socket.on('update-widget', (msg) => {
      console.log('update-widget', msg)
      this.getWidgets()
    })
  }

  getWidgets() {
    let widgets = []
    axios.get(server + '/widget/' + Store.currentId).then((res) => {
      res.data.map((widget) =>
        widgets.push(widget)
      )
      WidgetStore.widgets = widgets
      this.setState({
        listWidgets: WidgetStore.listWidgets
      })
      
    })
  }

  createMuuri() {
    grid = new Muuri('.grid', {
      dragEnabled: true,
      dragContainer: document.body,
      itemClass: 'col-md-3',
      dragStartPredicate: (item, event) => {
        return Store.mode
      },
      dragSort: function () {
        return [grid]
      }
    })
    grid.on('move', (data) => {
      console.log('ok')
    })
  }

  componentWillUnmount() {
    console.log('UnMount')
    grid = null
    this.setState({
      widgets: []
    })
  }

  render() {
    const listWidgets = this.state.listWidgets
    console.log(listWidgets)
    return (
      <div className='grid'>
        {listWidgets}
      </div>
    )
  }
}

export default Main
