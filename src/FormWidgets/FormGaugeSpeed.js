import React from 'react'
import WidgetStore from '../../store/WidgetStore'
import FormInput from './Input/FormInputBasic'
import InputText from './Input/InputText'

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
      machineId: this.props.machineId
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
      textColor: this.state.textColor
    }
    console.log(payload)
    WidgetStore.addWidgetToDB(this.props.machineId, payload)
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
      textColor: '#000000'
    })
  }
  render() {
    const payload = this.state
    return (
      <div className="FormGuage container">
        <form>
          <FormInput callback={this.handlePayload} values={this.state} />
          <InputText callback={this.handlePayload} title="Min Value" name="minvalue" value={payload.minvalue}/>
          <InputText callback={this.handlePayload} title="Max Value" name="maxvalue" value={payload.maxvalue}/>
          {/* <div className="form-group row">
            <label htmlFor="minvalue" className="col-3 col-form-label">
              Min Value :
          </label>
            <div className="col-9">
              <input
                name="minvalue"
                type="text"
                className="form-control"
                value={payload.minValue}
                onChange={this.handlePayload}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="maxvalue" className="col-3 col-form-label">
              Max Value :
          </label>
            <div className="col-9">
              <input
                name="maxvalue"
                type="text"
                className="form-control"
                value={payload.maxValue}
                onChange={this.handlePayload}
              />
            </div>
          </div> */}
          <div className="form-group row">
            <label htmlFor="segments" className="col-3 col-form-label">
              Segments :
          </label>
            <div className="col-9">
              <input
                name="segments"
                type="text"
                className="form-control"
                value={payload.segments}
                onChange={this.handlePayload}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="startColor" className="col-3 col-form-label">
              Start Color :
          </label>
            <div className="col-9">
              <input
                name="startColor"
                type="text"
                className="form-control"
                value={payload.startColor}
                onChange={this.handlePayload}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="endColor" className="col-3 col-form-label">
              End Color :
          </label>
            <div className="col-9">
              <input
                name="endColor"
                type="text"
                className="form-control"
                value={payload.endColor}
                onChange={this.handlePayload}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="textColor" className="col-3 col-form-label">
              Text Color :
          </label>
            <div className="col-9">
              <input
                name="textColor"
                type="text"
                className="form-control"
                value={payload.textColor}
                onChange={this.handlePayload}
              />
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="col-3">
              <button type="submit"
                className="btn btn-secondary btn-block"
                onClick={this.handleSubmit.bind(this)}
                data-dismiss="modal" aria-label="Close"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default FormGaugeSpeed