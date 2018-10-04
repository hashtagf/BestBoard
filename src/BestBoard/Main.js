import React, {
  Component
} from 'react'
import './Main.css'
import Store from '../store/Store'
import socketIOClient from 'socket.io-client'
import Muuri from 'muuri'
import axios from 'axios'
import WidgetStore from '../store/WidgetStore'
//const $ = require("jquery");
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

  componentWillMount() {
    this.response()
  }

  componentDidMount() {

  }

  response = () => {
    this.getWidgets()
    socket.on('update-widget', (msg) => {
      console.log('update-widget', msg)
      this.getWidgets()
    })
  }

  getWidgets() {
    axios.get(server + '/widget/' + Store.currentId).then((res) => {
      WidgetStore.widgets = []
      res.data.map((widget) =>
        WidgetStore.pushWidgets(widget)
      )
      this.setState({
        listWidgets: WidgetStore.listWidgets
      })
      this.createMuuri()
    })
  }

  createMuuri() {
    grid = new Muuri('.grid', {
      items: '.item',
      dragEnabled: true,
      dragContainer: document.body,
      itemClass: 'col-3',
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
      console.log('ok')
    })
  }

  componentWillUnmount() {
    grid.destroy(true)
    this.setState({
      listWidgets: []
    })
  }

  render() {
    const listWidgets = this.state.listWidgets
    return ( 
      <div className = 'grid'> 
      {listWidgets} 
      </div>
    )
  }
}


export default Main