import React from 'react'
import WidgetStore from '../../store/WidgetStore'

class FormCardBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Card Box',
      value: 0,
      unit: '',
      icon: '',
      status: true,
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
      typeWidget: 'CardBox',
      title: this.state.title,
      value: this.state.value,
      unit: this.state.unit,
      icon: this.state.icon
    }
    console.log(payload)
    WidgetStore.addWidgetToDB(this.props.machineId, payload)
    this.setState({
      title: 'Card Box',
      value: 0,
      unit: '',
      icon: '',
      status: true
    })
  }
  render() {
    const payload = this.state
    return (
      <div className="FormCardBox container">
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
            <label htmlFor="unit" className="col-3 col-form-label">
              Icon :
          </label>
            <div className="col-9">
              <input
                name="icon"
                type="text"
                className="form-control"
                value={payload.icon}
                onChange={this.handlePayload}
                placeholder="fontAwesome :: thermometer-half"
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

export default FormCardBox