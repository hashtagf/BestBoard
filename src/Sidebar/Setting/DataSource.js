import React, { Component } from 'react'
import DataSourceStore from '../../store/DatasourceStore'
import LocalStore from '../../store/LocalStore'
import socketIOClient from 'socket.io-client'
import axios from 'axios'
import NETPIEMicrogear from '../../store/Microgear'
import EditSource from './EditSource'
let server = 'http://172.18.6.7:5582'
// server = 'http://localhost:5582'

const socket = socketIOClient(server)

let status = []

class DataSource extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datasources: [],
      editSource: {
        _id: "",
        datasource: {
          appID: "",
          key: "",
          name: "NETPIE Microgear",
          secret: "",
          topic: "/#",
          typeDatasource: "NETPIE"
        }
      },
      connect: true
    }
  }
  componentDidMount () {
    if (this.state.connect) {
      this.getDatasource()
      this.response()
    }
    else this.loadLocal()
  }
  loadLocal = () => {
    this.setState({
      datasources: LocalStore.local.datasources
    })
    DataSourceStore.datasources = LocalStore.local.datasources
    NETPIEMicrogear.createMicrogear(LocalStore.local.datasources)
  }
  response = () => {
    socket.on('update-datasource', (msg) => {
      console.log('update-datasorce', msg)
      this.getDatasource()
    })
    socket.on('error', function(exception) {
      console.log('SOCKET ERROR', exception)
      socket.destroy()
    })
  }

  getDatasource() {
    axios.get(server + '/datasource/').then((res) => {
      DataSourceStore.datasources = res.data
      NETPIEMicrogear.createMicrogear(res.data)
      this.setState({
        datasources: res.data
      })
    })
  }
 
  handleNew = (e) => {
    this.setState({
      editSource: {
        _id: "",
        datasource: {
          appID: "",
          key: "",
          name: "NETPIE Microgear",
          secret: "",
          topic: "/#",
          typeDatasource: "NETPIE"
        }
      }
    })
  }
  callback = (obj,e) => {
    this.setState({
      editSource: obj
    })

  }

  render() {
    const datasources = this.state.datasources
    return (
      <div>
      <li>
        <a>Datasource</a>
        <ul className="list-unstyled" >
          <ListDataSources datasources={datasources} callback={this.callback}/>
          <li><a className="second" data-toggle="modal" data-target=".ModalEditSource" onClick={this.handleNew}><i className="fas fa-plus-square"></i> new source</a></li>
        </ul>   
      </li>
      <EditSource values={this.state.editSource} />
      </div>

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

  checkOnline=(id)=> {
    if (!status[id]) {
      NETPIEMicrogear.microgear[id].on('connected', () => {
        status[id] = true
        this.setState({
          status: status
        })
      })
    }
  }
  render() {
    let datasources = this.props.datasources
    return (
      datasources.map((source) =>
        <li key={source._id}>
          <a className="second">
            <div className="row">
              <div className="col-10 col-sm-10 text-truncate" data-toggle="modal" data-target={".ModalEditSource"} onClick={this.props.callback.bind(this,source)}>
                {source.datasource.name}
              </div>
              <div className="col-2 col-sm-2 px-0 tail">
                <div className="row tail">
                  <div className="col-6 px-0 py-auto">
                  {(!status[source.id])?this.checkOnline(source._id):''}
                    <div className="statusSource rounded-circle mt-1" id={(this.state.status[source._id]) ? 'online' : 'offline'}></div>
                  </div>
                  <div className="col-6 px-0 py-auto">
                    <span className="editmenu">
                      <i className="fas fa-minus-square editbtn del" onClick={() => this.deletePage(source._id)}></i>
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
