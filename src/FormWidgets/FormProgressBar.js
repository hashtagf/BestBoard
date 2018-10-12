import React from 'react'
import WidgetStore from '../store/WidgetStore'
import FormInputBasic from './Input/FormInputBasic'
import InputText from './Input/InputText'
import ColorInput from './Input/ColorInput'
import Store from '../store/Store'

class FormProgress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Progress Bar',
      value: 0,
      unit: '',
      strokeWidth: '8',
      trailWidth: '8',
      strokeColor: '#2db7f5',
      trailColor: '#D9D9D9',
      strokeLinecap: 'round',
      datasource: '',
      body: '',
      filter: ',',
      filterIndex: 0
    }
    this.handlePayload = this.handlePayload.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    let editWidget = nextProps.editWidget
    if (editWidget) {
      Object.keys(editWidget).forEach((objectKey) => {
        if (objectKey !== 'widgetId') {
          return this.setState({
            [objectKey]: editWidget[objectKey]
          })
        }
      });
    } else this.reState()
  }
  reState() {
    this.setState({
      title: 'Progress Bar',
      value: 0,
      unit: '',
      strokeWidth: '8',
      trailWidth: '8',
      strokeColor: '#2db7f5',
      trailColor: '#D9D9D9',
      strokeLinecap: 'round',
      datasource: '',
      body: '',
      filter: ',',
      filterIndex: 0
    })
  }
  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const editWidget = this.props.editWidget
    let payload = {
      typeWidget: 'ProgressBar',
      title: this.state.title,
      value: this.state.value,
      body: this.state.body,
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
    if (editWidget)
      WidgetStore.updateWidget(editWidget.widgetId, payload)
    else
      WidgetStore.createWidget(Store.currentId, payload)
    this.reState()
  }
  render() {
    const payload = this.state
    return (
      <div className="FormProgressBar container">
        <FormInputBasic callback={this.handlePayload} values={this.state} />
        <InputText
          callback={this.handlePayload}
          title="Unit"
          name="unit"
          value={payload.unit} />
        {/* <InputText
          callback={this.handlePayload}
          title="Stroke Color"
          name="strokeColor"
          value={payload.strokeColor} /> */}

        <div className="form-group row">
        <label htmlFor="unit" className="col-3 col-form-label text-capitalize">Color
        </label>
          <div className="col">
            <div className="form-group row">
              <label className="col-3 col-form-label">Stroke Color</label>
              <div className="col">
                  <ColorInput /* handleChangeComplete={this.handlePayload} */ name="strokeColor" />
              </div>
            </div>
          </div>
        </div>

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
      </div>
    )
  }
}

export default FormProgress