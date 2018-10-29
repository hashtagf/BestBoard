import React from 'react'
import WidgetStore from '../store/WidgetStore'
import Store from '../store/Store'
import InputText from './Input/InputText'
import SummitBtn from './SummitBtn'
import DatasourceStore from '../store/DatasourceStore'

class FormToggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Toggle',
      datasource: '',       
      body: '',
      toggleState: '',
      toggleValue: 1,
      type: 'chat',
      tpaOn: '',
      valueOn: '',
      tpaOff: '',
      valueOff: '',
      onCreated: '',
      onCreatedValue: '',
      jsValue: '',
      manual: false,
      listDatasources: DatasourceStore.listsDatasources()
    }
  }
  componentDidMount() {
    let editWidget = this.props.editWidget
    if (editWidget) {
      Object.keys(editWidget).forEach((objectKey) => {
        if (objectKey !== 'widgetId') {
          return this.setState({
            [objectKey]: editWidget[objectKey]
          })
        }
      })
    } else this.reState()
  }

  componentWillReceiveProps(nextProps){
    let editWidget = nextProps.editWidget
    if (editWidget) {
      Object.keys(editWidget).forEach((objectKey) => {
        if (objectKey !== 'widgetId') {
          return this.setState({
            [objectKey]: editWidget[objectKey]
          })
        }
      })
    } else this.reState()
  }

  reState () {
    this.setState({
      title: 'Toggle',
      datasource: '',       
      body: '',
      toggleState: '',
      toggleValue: 1,
      type: 'chat',
      tpaOn: '',
      valueOn: '',
      tpaOff: '',
      valueOff: '',
      onCreated: '',
      onCreatedValue: '',
      jsValue: '',
      manual: false
    })
  }
  handlePayload = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const editWidget = this.props.editWidget
    let payload = {
      typeWidget: 'Toggle',
      title: this.state.title,
      datasource: this.state.datasource,
      toggleState: this.state.toggleState,
      toggleValue: this.state.toggleValue,
      type: this.state.type,
      tpaOn: this.state.tpaOn,
      valueOn: this.state.valueOn,
      tpaOff: this.state.tpaOff,
      valueOff: this.state.valueOff,
      onCreated: this.state.onCreated,
      onCreatedValue: this.state.onCreatedValue,
      jsValue: this.state.jsValue,
      manual: this.state.manual,
      layout: {
        w: 3,
        h:6,
        minW: 2,
        minH: 5,
        maxW: 6,
        maxH: 8
      }
    }
    this.reState()
    if (editWidget)  
      WidgetStore.updateWidget(editWidget.widgetId, payload)
    else 
      WidgetStore.createWidget(Store.currentId, payload)
  }

  render() {
    const payload = this.state
    return (
      <div className="FormButton container">
        <InputText callback={this.handlePayload} title="Title" name="title" value={payload.title} />
        <div className="form-group row">
          <label htmlFor="datasource" className="col-3 col-form-label">
            Datasource :
          </label>
          <div className="col-9">
            <select className="custom-select" name="datasource" onBlur={this.handlePayload}>
              {payload.listDatasources}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="datasource" className="col-3 col-form-label">
            OnCreated :
          </label>
          <div className="col-6">
            <input type="text" name="onCreated"
              className="form-control"
              onChange={this.handlePayload}
              value={payload.onCreated}
              placeholder='Gearname (Alias) :: NodeMCU'
            />
          </div>
          <div className="col-3">
            <input type="text" name="onCreatedValue" 
              className="form-control"
              onChange={this.handlePayload} 
              value={payload.onCreatedValue} 
              placeholder='Value check State'  
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="datasource" className="col-3 col-form-label">
            Toggle State :
          </label>
          <div className="col-6">
            <input type="text" name="toggleState"
              className="form-control"
              onChange={this.handlePayload}
              value={payload.toggleState}
              placeholder='Topic :: /led/state'
            />
          </div>
          <div className="col-3">
            <input type="text" name="toggleValue" 
              className="form-control"
              onChange={this.handlePayload} 
              value={payload.toggleValue} 
              placeholder='Value check State'  
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="datasource" className="col-3 col-form-label">
            Type :
          </label>
          <div className="col-9">
            <select className="custom-select" name="type" onBlur={this.handlePayload}>
              <option value="chat">Chat</option>
              <option value="publish">Publish</option>
            </select>
          </div>
        </div>
        <TypeMicrogear payload={payload} handlePayload={this.handlePayload} />
        
        <SummitBtn handleSubmit={this.handleSubmit} editWidget={this.props.editWidget}/>
      </div>
    )
  }
}

class TypeMicrogear extends React.Component {
  render() {
    const { type ,tpaOn, tpaOff, valueOn, valueOff } = this.props.payload
    const handlePayload = this.props.handlePayload
    switch (type) {
      case 'chat':
        return (
          <span>
            <hr/>
            <h6>OnToggle ON Action</h6>
            <InputText callback={handlePayload}
              title="Alias"
              name="tpaOn"
              value={tpaOn}
              placeholder="Name Alias (Gearname)"
            />
            <InputText
              callback={handlePayload}
              title="Value"
              name="valueOn"
              value={valueOn}
            />
             <hr/>
            <h6>OnToggle OFF Action</h6>
            <InputText callback={handlePayload}
              title="Alias"
              name="tpaOff"
              value={tpaOff}
              placeholder="Name Alias (Gearname)"
            />
            <InputText
              callback={handlePayload}
              title="Value"
              name="valueOff"
              value={valueOff}
            />
          </span>
        )
      case 'publish':
        return (
          <span>
            <hr/>
            <h6>OnToggle ON Action</h6>
            <InputText
              callback={handlePayload}
              title="Topic"
              name="tpaOn"
              value={tpaOn}
              placeholder="Topic :: led/state/"
            />
            <InputText
              callback={handlePayload}
              title="Value"
              name="valueOn"
              value={valueOn}
            />
            <hr/>
            <h6>OnToggle OFF Action</h6>
            <InputText
              callback={handlePayload}
              title="Topic"
              name="tpaOff"
              value={tpaOff}
              placeholder="Topic :: led/state/"
            />
            <InputText
              callback={handlePayload}
              title="Value"
              name="valueOff"
              value={valueOff}
            />
          </span>
        )
      default: return <h4>Please Select Type Button</h4>
    }
  }
}


export default FormToggle

