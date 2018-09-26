import React from 'react'
import WidgetStore from '../../store/WidgetStore'

class FormProgress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Progress Bar',
      percent: 0,
      unit: '',
      strokeWidth: '8',
      trailWidth: '8',
      strokeColor: '#2db7f5',
      trailColor: '#D9D9D9',
      strokeLinecap: 'round',
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
      typeWidget: 'ProgressBar',
      title: this.state.title,
      percent: this.state.percent,
      unit: this.state.unit,
      strokeWidth: this.state.strokeWidth,
      trailWidth: this.state.trailWidth,
      strokeColor: this.state.strokeColor,
      trailColor: this.state.trailColor,
      strokeLinecap: this.state.strokeLinecap,
    }
    console.log(payload)
    WidgetStore.addWidgetToDB(this.props.machineId, payload)
    this.setState({
      title: 'Progress Bar',
      percent: 0,
      unit: '',
      strokeWidth: '8',
      trailWidth: '8',
      strokeColor: '#2db7f5',
      trailColor: '#D9D9D9',
      strokeLinecap: 'round'
    })
  }
  render() {
    const payload = this.state
    return (
      <div className="FormProgressBar container">
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
            <label htmlFor="percent" className="col-3 col-form-label">
              Value :
          </label>
            <div className="col-9">
              <input
                name="percent"
                type="text"
                className="form-control"
                value={payload.percent}
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
            <label htmlFor="strokeColor" className="col-3 col-form-label">
              Stroke Color :
          </label>
            <div className="col-9">
              <input
                name="strokeColor"
                type="text"
                className="form-control"
                value={payload.strokeColor}
                onChange={this.handlePayload}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="trailColor" className="col-3 col-form-label">
              Trial Color :
          </label>
            <div className="col-9">
              <input
                name="trailColor"
                type="text"
                className="form-control"
                value={payload.trailColor}
                onChange={this.handlePayload}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="strokeLinecap" className="col-3 col-form-label">
              Stroke Line cap :
          </label>
            <div className="col-9">
              <input
                name="strokeLinecap"
                type="text"
                className="form-control"
                placeholder="`butt`, `square` or `round`."
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