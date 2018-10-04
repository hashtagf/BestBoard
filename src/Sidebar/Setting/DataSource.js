import React, { Component } from 'react'
import DataSourceStore from '../../store/DatasourceStore'
import LocalStore from '../../store/LocalStore'
import socketIOClient from 'socket.io-client'
import axios from 'axios'
import NETPIEMicrogear from '../../store/Microgear'
//import CreateSource from './CreateSource'
//import './Settingmenu.css'

let server = 'http://172.18.6.7:5582'
const socket = socketIOClient(server)
let connect = socket.connected
let status = []

class DataSource extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datasources: []
    }
  }

  componentDidMount() {
    if (connect) this.response()
    else this.loadLocal()
  }
  loadLocal = () => {
    this.setState({
      datasources: LocalStore.local.datasources
    })
    NETPIEMicrogear.createDatasource(LocalStore.local.datasources)
    DataSourceStore.datasources = LocalStore.local.datasources
  }
  response = () => {
    this.getDatasource()
    socket.on('update-datasource', (msg) => {
      console.log('update-datasorce', msg)
      this.getDatasource()
    })
  }

  getDatasource() {
    axios.get(server + '/datasource/').then((res) => {
      NETPIEMicrogear.createDatasource(res.data)
      DataSourceStore.datasources = res.data
      this.setState({
        datasources: res.data
      })
    })
  }

  componentWillUnMount() {
    this.setState({
      datasources: []
    })
  }

  render() {
    const datasources = this.state.datasources
    return (
      <li>
        <a>Datasource</a>
        <ul className="list-unstyled" >
          <ListDataSources datasources={datasources}/>
          <li><a className="second" data-toggle="modal" data-target=".ModalCreateSource"><i className="fas fa-plus-square"></i> new source</a></li>
        </ul>
        
      </li>
    )
  }
}

class ListDataSources extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: []
    }
  }

  deletePage = (sourceId) => {
    DataSourceStore.deleteDatasource(sourceId)
  }

  checkOnline (id) {
    NETPIEMicrogear.microgear[id].on('connected', () => {
      status[id] = true
      this.setState({
        status: status
      })
    })
  }
  render() {
    let datasources = this.props.datasources
    return (
      datasources.map((source) =>
        <li key={source._id}>
          <a className="second" data-toggle="modal" data-target=".ModalCreateSource">
          <div className="row">
            <div className="col-9 col-sm-10 text-truncate">
              {source.datasource.name}
            </div>
            <div className="col-2 col-sm-2 px-0 tail">
              <div className="row">
                <div className="col-6 px-0 py-auto">
                  { this.checkOnline(source._id) }
                  <div className="statusSource rounded-circle mx-0" id={(this.state.status[source._id])?'online':'offline'}></div>
                </div>
                <div className="col-6 px-0 py-auto">
                  <span className="editmenu">
                    <i className="fas fa-minus-square editbtn" onClick={() => this.deletePage(source._id)}></i>
                  </span>
                </div>
              </div>
              

            </div>
          </div>
          </a>
        </li>
      )
    )
  }
}
export default DataSource
