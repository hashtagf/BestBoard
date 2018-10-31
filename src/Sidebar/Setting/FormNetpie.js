
import React, { Component } from 'react'
import JsInput from '../../FormWidgets/Input/JsInput'
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
      jsOncreated: '',
      _id: ''
    }
    
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.values !== undefined || nextProps.values._id === '') {
      var props = nextProps.values.datasource
      this.setState({
        _id: nextProps.values._id,
        typeDatasource: props.typeDatasource,
        name: props.name,
        appID: props.appID,
        key: props.key,
        secret: props.secret,
        topic: props.topic,
        jsOnconnect: props.jsOnconnect,
        jsOncreated: props.jsOncreated
      })
    }
  }
  handleChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleNew = (e)=> {
    e.preventDefault()
    const state = this.state
    if (state.appID&&state.key&&state.secret){
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
      DatasourceStore.createDatasource(payload)
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
  }
  handleEdit=(e)=> {
    e.preventDefault()
    const state = this.state
    if (state.appID&&state.key&&state.secret){
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
      DatasourceStore.updateDatasource(state._id, payload)
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
  }
  render() { 
    var values = this.state
    var _id = this.props.values._id
    // if (this.props.values !== undefined) {
    //   var props = this.props.values.datasource
    //   _id = this.props.values._id
    //   values = {
    //     appID: props.appID,
    //     key: props.key,
    //     name: props.name,
    //     secret: props.secret,
    //     topic: props.topic,
    //     typeDatasource: props.typeDatasource
    //   }
    // }
    return (
      <div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" 
            className="form-control" 
            id="name" name="name" 
            aria-describedby="emailHelp" 
            placeholder="Enter name" 
            onChange={this.handleChange} 
            value={values.name}
            />
        </div>
        <div className="form-group">
          <label htmlFor="appID">App ID *</label>
          <input type="text" 
            className="form-control" 
            id="appID" name="appID" 
            aria-describedby="emailHelp" 
            placeholder="Enter App ID" 
            onChange={this.handleChange} 
            value={values.appID}/>
          <small id="emailHelp" className="form-text text-muted">NETPIE App name obtained from <a href="https://netpie.io/app">https://netpie.io/app</a></small>
        </div>
        <div className="form-group">
          <label htmlFor="key">Key *</label>
          <input type="text" 
            className="form-control" 
            id="key" name="key" 
            aria-describedby="emailHelp" 
            placeholder="Enter Key" 
            onChange={this.handleChange} 
            value={values.key}/>
        </div>
        <div className="form-group">
          <label htmlFor="secret">Secret *</label>
          <input type="password" 
            className="form-control" 
            id="secret" name="secret" 
            placeholder="Enter Secret" 
            onChange={this.handleChange} 
            value={values.secret}/>
        </div>
        <div className="form-group">
          <label htmlFor="topic">Subscribed Topics</label>
          <input type="text" 
            className="form-control" 
            id="topic" name="topic" 
            placeholder="Enter Topics" 
            onChange={this.handleChange} 
            value={values.topic}/>
        </div>
        <details className="mb-4" open="">
          <summary>Advance</summary>
          <div className="form-group my-1">
            <label htmlFor="jsOncreated">Oncreated Action</label>
            <JsInput name={"jsOncreated"} callback={this.handleChange} value={values.jsOncreated}/>
            <small>Java script code to run after a datasource is created.</small>
            <label htmlFor="jsOnconnect">Onconnected Action</label>
            <JsInput name={"jsOnconnect"} callback={this.handleChange} value={values.jsOnconnect}/>
            <small>Java script code to run after a datasource is created.</small>
          </div>
          
        </details>
        <Buttonform _id={_id} edit={this.handleEdit} new={this.handleNew}/>

      </div>
    )
  }
}
class Buttonform extends Component {
  render () {
    if (this.props._id) {
      return <button type="submit" onClick={this.props.edit} className="btn btn-primary border-0" data-dismiss="modal" aria-label="Close" aria-hidden={true}><i className="fas fa-pen-square"></i> Save</button>
    }
    return <button type="submit" onClick={this.props.new} className="btn btn-primary border-0" data-dismiss="modal" aria-label="Close" aria-hidden={true}><i className="fas fa-plus-circle"></i> Save</button>

  }
}

export default FormSource
