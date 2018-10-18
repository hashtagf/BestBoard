import React from 'react'
import WidgetStore from '../store/WidgetStore'
import FormInputBasic from './Input/FormInputBasic'
import InputText from './Input/InputText'
import Store from '../store/Store' 
import SummitBtn from './SummitBtn'
import ColorInput from './Input/ColorInput'

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
      body: '',
      filter: ',',
      filterIndex: 0,
      jsValue: '',
      manual: false
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
  reState () {
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
      typeWidget: 'GaugeSpeed',
      title: this.state.title,
      value: this.state.value,
      body: this.state.body,
      unit: this.state.unit,
      minValue: this.state.minValue,
      maxValue: this.state.maxValue,
      segments: this.state.segments,
      startColor: this.state.startColor,
      endColor: this.state.endColor,
      textColor: this.state.textColor,
      datasource: this.state.datasource,
      filter: this.state.filter,
      filterIndex: this.state.filterIndex,
      jsValue: this.state.jsValue,
      manual: this.state.manual
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
      <div className="FormGuage container">
        <FormInputBasic callback={this.handlePayload} values={payload} />
        <InputText callback={this.handlePayload} title="Unit" name="unit" value={payload.unit} />
        <InputText callback={this.handlePayload} title="Min Value" name="minValue" value={payload.minValue} />
        <InputText callback={this.handlePayload} title="Max Value" name="maxValue" value={payload.maxValue} />
        <InputText callback={this.handlePayload} title="Segments" name="segments" value={payload.segments} />
        <ColorInput color={payload.startColor} handleChangeComplete={this.handlePayload} title="Start Color" name="startColor" />
        <ColorInput color={payload.endColor} handleChangeComplete={this.handlePayload} title="End Color" name="endColor" />
        <ColorInput color={payload.textColor} handleChangeComplete={this.handlePayload} title="Text Color" name="textColor" />
        <SummitBtn handleSubmit={this.handleSubmit} editWidget={this.props.editWidget}/>

      </div>
    )
  }
}

export default FormGaugeSpeed