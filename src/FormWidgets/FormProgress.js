import React from 'react'
import WidgetStore from '../store/WidgetStore'
import FormInputBasic from './Input/FormInputBasic'
import InputText from './Input/InputText'
import Store from '../store/Store'

class FormProgress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Progress',
      value: 0,
      unit: '',
      minvalue: '0',
      maxvalue: '100',
      setColor: '',
      theme: 'light',
      mode: 'progress',
      enableAnimation: true,
      datasource: '',
      filter: '',
      filterIndex: 0
    }
    this.handlePayload = this.handlePayload.bind(this)
  }

  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    let payload = {
      typeWidget: 'Progress',
      title: this.state.title,
      value: this.state.value,
      unit: this.state.unit,
      minvalue: this.state.minvalue,
      maxvalue: this.state.maxvalue,
      setColor: this.state.setColor,
      theme: this.state.theme,
      mode: this.state.mode,
      enableAnimation: this.state.enableAnimation,
      datasource: this.state.datasource,
      filter: this.state.filter,
      filterIndex: this.state.filterIndex
    }
    WidgetStore.createWidget(Store.currentId, payload)
    this.setState({
      title: 'Progress',
      value: 0,
      unit: '',
      minvalue: '0',
      maxvalue: '100',
      setColor: '',
      theme: 'light',
      mode: 'progress',
      enableAnimation: true,
      datasource: '',
      filter: '',
      filterIndex: 0
    })
  }
  render() {
    const payload = this.state
    return (
      <div className="FormProgress container">
        <FormInputBasic callback={this.handlePayload} values={payload} />
        <InputText callback={this.handlePayload} title="Unit" name="unit" value={payload.unit} />
        <InputText callback={this.handlePayload} title="Min Value" name="minvalue" value={payload.minvalue} />
        <InputText callback={this.handlePayload} title="Max Value" name="maxvalue" value={payload.maxvalue} />
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

export default FormProgress