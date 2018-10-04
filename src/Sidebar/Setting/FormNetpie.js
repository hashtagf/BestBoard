import React, { Component } from 'react'
//import './Settingmenu.css'
class FormSource extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'netpie',
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
          <input type="password" className="form-control" id="secret" name="secret" placeholder="Enter Secret" onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="topic">Subscribed Topics</label>
          <input type="text" className="form-control" id="topic" name="topic" placeholder="Enter Topics" onChange={this.handleChange}/>
        </div>
        <details open="">
          <summary>Advance</summary>
          <div className="form-group">
            <label htmlFor="jsOncreated">Oncreated Action</label>
            <input type="text" className="form-control" id="jsOncreated" name="jsOncreated" placeholder="Enter Java script" onChange={this.handleChange}/>
            <small>Java script code to run after a datasource is created.</small>
            <label htmlFor="jsOnconnect">Onconnected Action</label>
            <input type="text" className="form-control" id="jsOnconnect" name="jsOnconnect" placeholder="Enter Java script" onChange={this.handleChange}/>
            <small>Java script code to run after a datasource is created.</small>
          </div>
          
        </details>
        <button type="submit" className="btn btn-primary">Save</button>
      </div>
    )
  }
}

export default FormSource
