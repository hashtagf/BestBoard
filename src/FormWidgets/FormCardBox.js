import React from 'react'
import WidgetStore from '../store/WidgetStore'
import Store from '../store/Store'
import DatasourceStore from '../store/DatasourceStore'
import FormInputBasic from './Input/FormInputBasic'
import InputText from './Input/InputText'
class FormCardBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Card Box',
      value: '',
      datasource: '',
      unit: '',
      icon: '',
      status: true,
      listDatasources: DatasourceStore.listsDatasources()
    }
    this.handlePayload = this.handlePayload.bind(this)
  }

  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(e.target.name,e.target.value)
  }

  handleSubmit(e) {
    e.preventDefault()
    let payload = {
      typeWidget: 'CardBox',
      title: this.state.title,
      value: this.state.value,
      datasource: this.state.datasource,
      unit: this.state.unit,
      icon: this.state.icon
    }
    console.log(payload)
    WidgetStore.createWidget(Store.currentId, payload)
    this.setState({
      title: null || 'Card Box',
      value: '',
      datasource: '',
      unit: '',
      icon: '',
      status: true
    })
  }

  render() {
    const state = this.state
    let obj = {
      title: state.title,
      listDatasources: state.listDatasources,
      value: state.value
    }
    return (
      <div className="FormCardBox container">
        <FormInputBasic callback={this.handlePayload} values={this.state} />
        <InputText callback={this.handlePayload} title="Unit" name="unit" value={this.state.unit}/>

        <div className="form-group row">
          <label htmlFor="unit" className="col-3 col-form-label">
            Icon :
          </label>
          <div className="col-9">
            <input
              name="icon"
              type="text"
              className="form-control"
              value={state.icon}
              onChange={this.handlePayload}
              placeholder="fontAwesome :: thermometer-half"
            />
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button"
              className="btn btn-primary border-0"
              onClick={this.handleSubmit.bind(this)}
              data-dismiss="modal" aria-label="Close"
            ><i className="fas fa-plus-square"></i> Add widget</button>
          </div>
        </div>
      </div>
    )
  }
}


export default FormCardBox