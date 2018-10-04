import React, { Component } from 'react'
import DataSourceStore from '../../store/DatasourceStore'
import socketIOClient from 'socket.io-client'
import axios from 'axios'
//import './Settingmenu.css'

let server = 'http://172.18.6.7:5582'
const socket = socketIOClient(server)

class DataSource extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datasources: []
    }
  }

  componentDidMount() {
    this.response()
  }

  response = () => {
    this.getDatasource()
    socket.on('update-datasource', (msg) => {
      console.log('update-datasorce', msg)
      this.getDatasource()
    })
  }

  getDatasource() {
    let datasources = []
    axios.get(server + '/datasource/').then((res) => {
      res.data.map((datasource) =>
        datasources.push(datasource)
      )
      this.setState({
        datasources: datasources
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
          <ListDataSources datasources={datasources} />
          <li><a className="second" data-toggle="modal" data-target=".ModalCreateSource"><i className="fas fa-plus-square"></i> new source</a></li>
        </ul>
      </li>
    )
  }
}
class ListDataSources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
      editPage: null,
      selectPage: 0
    }
  }
  clickEdit = (index) => {
    this.setState({
      editPage: index,
      inputName: this.state.pages[index].name
    })
  }

  deletePage = (sourceId) => {
    DataSourceStore.deleteDatasource(sourceId)
  }
  render() {
    let datasources = this.props.datasources
    return (
      datasources.map((source) =>
        <li key={source._id}>
          <a className="second" data-toggle="modal" data-target=".ModalCreateSource">
          <div className="row">
            <div className="col-8 col-sm-10 text-truncate">
              {source.datasource.name}
            </div>
            <div className="col-2 col-sm-2 editmenu px-0">
              <i className="fas fa-pen-square editbtn mr-1" onClick={() => this.clickEdit(source._id)}></i>
              <i className="fas fa-minus-square editbtn" onClick={() => this.deletePage(source._id)}></i>
            </div>
          </div>
          </a>
        </li>
      )
    )
  }
}
export default DataSource
