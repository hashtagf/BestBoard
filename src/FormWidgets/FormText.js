import React from 'react'
import WidgetStore from '../../store/WidgetStore'

class FormText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Text',
      text: '',
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
      typeWidget: 'Text',
      title: this.state.title,
      text: this.state.text
    }
    console.log(payload)
    WidgetStore.addWidgetToDB(this.props.machineId, payload)
    this.setState({
      title: 'Text',
      text: ''
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
            <label htmlFor="text" className="col-3 col-form-label">
              Text :
          </label>
            <div className="col-9">
              <textarea
                name="text"
                type="textarea"
                className="form-control"
                value={payload.percent}
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

export default FormText