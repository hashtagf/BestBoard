
import React, { Component } from 'react'
import JsInput from '../../FormWidgets/JsInput'
import DatasourceStore from '../../store/DatasourceStore'

class FormSource extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'NETPIE Microgear',
      appID: '',
      key: '',
      secret: '',
      topic: '/#',
      jsOnconnect: '',
      jsOncreated: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const state = this.state
    let payload = {
      typeDatasource: 'NETPIE',
      name: state.name,
      appID: state.appID,
      key: state.key,
      secret: state.secret,
      topic: state.topic,
      jsOnconnect: state.jsOnconnect,
      jsOncreated: state.jsOncreated
    }
    this.setState({
      name: 'NETPIE Microgear',
      appID: '',
      key: '',
      secret: '',
      topic: '/#',
      jsOnconnect: '',
      jsOncreated: ''
    })
    DatasourceStore.createDatasource(payload)
  }
  inputJs = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter name" onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="appID">App ID *</label>
          <input type="text" className="form-control" id="appID" name="appID" aria-describedby="emailHelp" placeholder="Enter App ID" onChange={this.handleChange}/>
          <small id="emailHelp" className="form-text text-muted">NETPIE App name obtained from <a href="https://netpie.io/app">https://netpie.io/app</a></small>
        </div>
        <div className="form-group">
          <label htmlFor="key">Key *</label>
          <input type="text" className="form-control" id="key" name="key" aria-describedby="emailHelp" placeholder="Enter Key" onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="secret">Secret *</label>
          <input type="password" className="form-control" id="secret" name="secret" placeholder="Enter Secret" onChange={this.handleChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="topic">Subscribed Topics</label>
          <input type="text" className="form-control" id="topic" name="topic" placeholder="Enter Topics" onChange={this.handleChange}/>
        </div>
        <details open="">
          <summary>Advance</summary>
          <div className="form-group my-1">
            <label htmlFor="jsOncreated">Oncreated Action</label>
            <JsInput name={"jsOncreated"} callback={this.inputJs}/>
            <small>Java script code to run after a datasource is created.</small>
            <label htmlFor="jsOnconnect">Onconnected Action</label>
            <JsInput name={"jsOnconnect"} callback={this.inputJs}/>
            <small>Java script code to run after a datasource is created.</small>
          </div>
          
        </details>
        <button type="submit" onClick={this.handleSubmit.bind(this)} className="btn btn-primary">Save</button>
      </div>
    )
  }
}

export default FormSource
