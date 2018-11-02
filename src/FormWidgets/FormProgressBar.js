import React from 'react'
import WidgetStore from '../store/WidgetStore'
import FormInputBasic from './Input/FormInputBasic'
import InputText from './Input/InputText'
import ColorInput from './Input/ColorInput'
import Store from '../store/Store'
import SummitBtn from './SummitBtn'

class FormProgress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Progress Bar',
      value: 0,
      unit: '',
      strokeWidth: '8',
      trailWidth: '8',
      strokeColor: Store.colorSet[Store.colorUse].colors[2],
      trailColor: '#D9D9D9',
      strokeLinecap: 'round',
      datasource: '',
      body: '',
      filter: ',',
      filterIndex: 0,
      jsValue: '',
      manual: false
    }
    this.handlePayload = this.handlePayload.bind(this)
  }
  componentDidMount() {
    let editWidget = this.props.editWidget
    if (editWidget) {
      Object.keys(editWidget).forEach((objectKey) => {
        if (objectKey !== 'widgetId') {
          return this.setState({
            [objectKey]: editWidget[objectKey]
          })
        }
      })
    } else this.reState()
  }

  componentWillReceiveProps(nextProps){
    let editWidget = nextProps.editWidget
    if (editWidget) {
      Object.keys(editWidget).forEach((objectKey) => {
        if (objectKey !== 'widgetId') {
          return this.setState({
            [objectKey]: editWidget[objectKey]
          })
        }
      })
    } else this.reState()
  }

  reState() {
    this.setState({
      title: 'Progress Bar',
      value: 0,
      unit: '',
      strokeWidth: '8',
      trailWidth: '8',
      strokeColor: Store.colorSet[Store.colorUse].colors[2],
      trailColor: '#D9D9D9',
      strokeLinecap: 'round',
      datasource: '',
      body: '',
      filter: ',',
      filterIndex: 0,
      jsValue: '',
      manual: false
    })
  }
  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
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
      filterIndex: this.state.filterIndex,
      jsValue: this.state.jsValue,
      manual: this.state.manual,
      layout: {
        w: 3,
        h:5,
        minW: 2,
        minH: 5,
        maxW: 6,
        maxH: 6
      }
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
        <ColorInput color={payload.strokeColor} handleChangeComplete={this.handlePayload} title="Stroke Color" name="strokeColor" />
        <ColorInput color={payload.trailColor} handleChangeComplete={this.handlePayload} title="Trial Color" name="trailColor" />

        <InputText
          callback={this.handlePayload}
          title="Stroke Line cap"
          name="strokeLinecap"
          value={payload.strokeLinecap}
          placeholder="`butt`, `square` or `round`." />

          <SummitBtn handleSubmit={this.handleSubmit} editWidget={this.props.editWidget}/>
      </div>
    )
  }
}

export default FormProgress