import React from 'react'
import WidgetStore from '../store/WidgetStore'
import FormInputBasic from './Input/FormInputBasic'
import InputText from './Input/InputText'
import Store from '../store/Store' 

class FormGaugeSpeed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Gauge Speed',
      value: 0,
      unit: '',
      width: 300,
      height: 200,
      minValue: '0',
      maxValue: '100',
      segments: 3,
      startColor: '#00ee00',
      endColor: '#ff0000',
      textColor: '#000000',
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
      typeWidget: 'GaugeSpeed',
      title: this.state.title,
      value: this.state.value,
      unit: this.state.unit,
      minValue: this.state.minValue,
      maxValue: this.state.maxValue,
      segments: this.state.segments,
      startColor: this.state.startColor,
      endColor: this.state.endColor,
      textColor: this.state.textColor,
      datasource: this.state.datasource,
      filter: this.state.filter,
      filterIndex: this.state.filterIndex
    }
    WidgetStore.createWidget(Store.currentId, payload)
    this.setState({
      title: 'Gauge Speed',
      value: 0,
      unit: '',
      width: 300,
      height: 200,
      minValue: '0',
      maxValue: '100',
      segments: 3,
      startColor: '#00ee00',
      endColor: '#ff0000',
      textColor: '#000000',
      datasource: '',
      filter: '',
      filterIndex: 0
    })
  }
  render() {
    const payload = this.state
    return (
      <div className="FormGuage container">
        <FormInputBasic callback={this.handlePayload} values={payload} />
        <InputText callback={this.handlePayload} title="Unit" name="unit" value={payload.unit} />
        <InputText callback={this.handlePayload} title="Min Value" name="minvalue" value={payload.minValue} />
        <InputText callback={this.handlePayload} title="Max Value" name="maxvalue" value={payload.maxValue} />
        <InputText callback={this.handlePayload} title="Segments" name="segments" value={payload.segments} />
        <InputText callback={this.handlePayload} title="End Color" name="startColor" value={payload.startColor} />
        <InputText callback={this.handlePayload} title="Start Color" name="endColor" value={payload.endColor} />
        <InputText callback={this.handlePayload} title="Text Color" name="textColor" value={payload.textColor} />
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

export default FormGaugeSpeed