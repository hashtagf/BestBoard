import React from 'react'
import WidgetStore from '../store/WidgetStore'
import Store from '../store/Store'
import InputText from './Input/InputText'
import DatasourceStore from '../store/DatasourceStore'

class FormToggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Toggle',
      labelOn: 'ON',
      labelOff: 'OFF',
      datasource: '',
      toggleState: '',
      toggleValue: 1,
      type: 'chat',
      tpaOn: '',
      valueOn: '',
      tpaOff: '',
      valueOff: '',
      onCreated: '',
      listDatasources: DatasourceStore.listsDatasources()
    }
  }

  handlePayload = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let payload = {
      typeWidget: 'Toggle',
      title: this.state.title,
      labelOn: this.state.labelOn,
      labelOff: this.state.labelOff,
      datasource: this.state.datasource,
      toggleState: this.state.toggleState,
      toggleValue: this.state.toggleValue,
      type: this.state.type,
      tpaOn: this.state.tpaOn,
      valueOn: this.state.valueOn,
      tpaOff: this.state.tpaOff,
      valueOff: this.state.valueOff,
      onCreated: this.state.onCreated
    }
    this.setState({
      title: 'Toggle',
      labelOn: 'ON',
      labelOff: 'OFF',
      datasource: '',
      toggleState: '',
      toggleValue: 1,
      type: 'chat',
      tpaOn: '',
      valueOn: '',
      tpaOff: '',
      valueOff: ''
    })
    WidgetStore.createWidget(Store.currentId, payload)
  }

  render() {
    const payload = this.state
    return (
      <div className="FormButton container">
        <InputText callback={this.handlePayload} title="Title" name="title" value={payload.title} />
        <InputText callback={this.handlePayload} title="Label ON" name="labelOn" value={payload.labelOn} />
        <InputText callback={this.handlePayload} title="Label OFF" name="labelOff" value={payload.labelOff} />
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

        <div className="row justify-content-end">
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button"
              className="btn btn-primary border-0"
              onClick={this.handleSubmit}
              data-dismiss="modal" aria-label="Close"
            ><i className="fas fa-plus-square"></i> Add widget</button>
          </div>
        </div>
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

