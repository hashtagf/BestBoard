import React from 'react'
import WidgetStore from '../store/WidgetStore'
import FormInputBasic from './Input/FormInputBasic'
import InputText from './Input/InputText'
import Store from '../store/Store'
import SummitBtn from './SummitBtn'

class FormGauge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Gauge',
      value: 0,
      unit: '',
      minvalue: '0',
      //maxvalue: '100',
      setColor: '',
      theme: 'light',
      mode: 'gauge',
      enableAnimation: true,
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
      });
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
      });
    } else this.reState()
  }

  reState () {
    this.setState({
      title: 'Gauge',
      value: 0,
      unit: '',
      minvalue: '0',
      // maxvalue: '100',
      setColor: '',
      theme: 'light',
      mode: 'gauge',
      enableAnimation: true,
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
      typeWidget: 'Gauge',
      title: this.state.title,
      value: this.state.value,
      body: this.state.body,
      unit: this.state.unit,
      minvalue: this.state.minvalue,
      //maxvalue: this.state.maxValue,
      setColor: this.state.setColor,
      theme: this.state.theme,
      mode: this.state.mode,
      enableAnimation: this.state.enableAnimation,
      datasource: this.state.datasource,
      filter: this.state.filter,
      filterIndex: this.state.filterIndex,
      jsValue: this.state.jsValue,
      manual: this.state.manual,
      layout: {
        w: 3,
        h:7,
        minW: 3,
        minH: 6,
        maxW: 6,
        maxH: 10
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
      <div className="FormGuage container">
        <FormInputBasic callback={this.handlePayload} values={payload} />
        <InputText callback={this.handlePayload} title="Unit" name="unit" value={payload.unit} />
        <div className="form-group row">
          <label htmlFor="datasource" className="col-3 col-form-label">
            Mode :
          </label>
          <div className="col-9">
            <select className="form-control custom-select selectdefault"
              name="mode"
              onChange={this.handlePayload}
              value={payload.mode}
            >
              <option value="gauge" >Gauge</option>
              <option value="progress" >Progress</option>
            </select>
          </div>
        </div>
        <InputText callback={this.handlePayload} title="Min Value" name="minvalue" value={payload.minvalue} />
        {/* <InputText callback={this.handlePayload} title="Max Value" name="maxvalue" value={payload.maxvalue} /> */}
        <SummitBtn handleSubmit={this.handleSubmit} editWidget={this.props.editWidget}/>

      </div>
    )
  }
}

export default FormGauge