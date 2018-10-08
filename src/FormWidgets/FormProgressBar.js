import React from 'react'
import WidgetStore from '../store/WidgetStore'
import FormInputBasic from './Input/FormInputBasic'
import InputText from './Input/InputText'
import Store from '../store/Store'

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
      typeWidget: 'ProgressBar',
      title: this.state.title,
      percent: this.state.percent,
      unit: this.state.unit,
      strokeWidth: this.state.strokeWidth,
      trailWidth: this.state.trailWidth,
      strokeColor: this.state.strokeColor,
      trailColor: this.state.trailColor,
      strokeLinecap: this.state.strokeLinecap,
      datasource: this.state.datasource,
      filter: this.state.filter,
      filterIndex: this.state.filterIndex
    }
    WidgetStore.createWidget(Store.currentId, payload)
    this.setState({
      title: 'Progress Bar',
      percent: 0,
      unit: '',
      strokeWidth: '8',
      trailWidth: '8',
      strokeColor: '#2db7f5',
      trailColor: '#D9D9D9',
      strokeLinecap: 'round',
      datasource: '',
      filter: '',
      filterIndex: 0
    })
  }
  render() {
    const payload = this.state
    return (
      <div className="FormProgressBar container">
        <form>
          <FormInputBasic callback={this.handlePayload} values={this.state} />
          <InputText
            callback={this.handlePayload}
            title="Unit"
            name="unit"
            value={payload.unit} />
          <InputText
            callback={this.handlePayload}
            title="Stroke Color"
            name="strokeColor"
            value={payload.strokeColor} />
          <InputText
            callback={this.handlePayload}
            title="Trial Color"
            name="trailColor"
            value={payload.trailColor} />
          <InputText
            callback={this.handlePayload}
            title="Stroke Line cap"
            name="strokeLinecap"
            value={payload.strokeLinecap}
            placeholder="`butt`, `square` or `round`." />
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
        </form>
      </div>
    )
  }
}

export default FormProgress