import React from 'react'
import WidgetStore from '../../store/WidgetStore'

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
      typeWidget: 'Progress',
      title: this.state.title,
      value: this.state.value,
      unit: this.state.unit,
      minvalue: this.state.minvalue,
      maxvalue: this.state.maxvalue,
      setColor: this.state.setColor,
      theme: this.state.theme,
      mode: this.state.mode,
      enableAnimation: this.state.enableAnimation
    }
    console.log(payload)
    WidgetStore.addWidgetToDB(this.props.machineId, payload)
    this.setState({
      title: 'Progress',
      value: 0,
      unit: '',
      minvalue: '0',
      maxvalue: '100',
      setColor: '',
      theme: 'light',
      mode: 'progress',
      enableAnimation: true
    })
  }
  render() {
    const payload = this.state
    return (
      <div className="FormProgress container">
        <form>
          <div className="form-group row">
            <label htmlFor="title" className="col-3 col-form-label">
              Title :
          </label>
            <div className="col-9">
              <input
                name="title"
                type="text"
                className="form-control"
                value={payload.title}
                onChange={this.handlePayload}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="value" className="col-3 col-form-label">
              Value :
          </label>
            <div className="col-9">
              <input
                name="value"
                type="text"
                className="form-control"
                value={payload.value}
                onChange={this.handlePayload}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="unit" className="col-3 col-form-label">
              Unit :
          </label>
            <div className="col-9">
              <input
                name="unit"
                type="text"
                className="form-control"
                value={payload.unit}
                onChange={this.handlePayload}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="minvalue" className="col-3 col-form-label">
              Min Value :
          </label>
            <div className="col-9">
              <input
                name="minvalue"
                type="text"
                className="form-control"
                value={payload.minvalue}
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
                value={payload.maxvalue}
                onChange={this.handlePayload}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="setColor" className="col-3 col-form-label">
              set Color :
          </label>
            <div className="col-9">
              <textarea
                name="setColor"
                type="textarea"
                className="form-control"
                value={payload.setColor}
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

export default FormProgress