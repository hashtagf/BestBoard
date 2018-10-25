import React from 'react'
import WidgetStore from '../store/WidgetStore'
import Store from '../store/Store'
import InputText from './Input/InputText'
import DatasourceStore from '../store/DatasourceStore'
import SummitBtn from './SummitBtn'

class FormButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Button',
      label: 'Click',
      datasource: '',       
      body: '',
      type: 'chat',
      tpa: '',
      value: '',
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
      });
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
      });
    } else this.reState()
  }

  reState () {
    this.setState({
      title: 'Button',
      label: 'Click',
      datasource: '',       
      body: '',
      type: 'chat',
      tpa: '',
      value: '',
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
      typeWidget: 'Button',
      title: this.state.title,
      label: this.state.label,
      datasource: this.state.datasource,
      type: this.state.type,
      tpa: this.state.tpa,
      value: this.state.value,
      jsValue: this.state.jsValue,
      manual: this.state.manual,
      layout: {
        w: 3,
        h:4,
        minW: 3,
        minH: 4,
        maxW: 6,
        maxH: 6
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
        <InputText callback={this.handlePayload} title="Label Button" name="label" value={payload.label} />
        <hr />
        <h6>OnClick Action</h6>
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
    const { tpa, type, value } = this.props.payload
    const handlePayload = this.props.handlePayload
    switch (type) {
      case 'chat':
        return (
          <span>
            <InputText callback={handlePayload}
              title="Alias"
              name="tpa"
              value={tpa}
              placeholder="Name Alias (Gearname)"
            />
            <InputText
              callback={handlePayload}
              title="Value"
              name="value"
              value={value}
            />
          </span>
        )
      case 'publish':
        return (
          <span>
            <InputText
              callback={handlePayload}
              title="Topic"
              name="tpa"
              value={tpa}
              placeholder="Topic :: room/temp/"
            />
            <InputText
              callback={handlePayload}
              title="Value"
              name="value"
              value={value}
            />
          </span>
        )
      default: return <h4>Please Select Type Button</h4>
    }
  }
}


export default FormButton

