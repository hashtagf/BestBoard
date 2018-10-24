import React from 'react'
import WidgetStore from '../store/WidgetStore'
import Store from '../store/Store'
import FormInputBasic from './Input/FormInputBasic'
import InputText from './Input/InputText'
import SummitBtn from './SummitBtn'
import fontAwesomeIcons from './fontawesomeIcons.json'
import Creatable from 'react-select/lib/Creatable'

class FormLed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'LED',
      value: '',
      datasource: '',
      body: '',
      filter: ',',
      filterIndex: 0,
      jsValue: '',
      manual: false,
      expressionON: '',
      expressionOFF: 'else',
      valueON: '',
      valueOFF: ''
    }
    this.handlePayload = this.handlePayload.bind(this)
  }
  // Start Widget
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
      title: 'LED',
      datasource: '',       
      body: '',
      value: '',
      filter: ',',
      filterIndex: 0,
      jsValue: '',
      manual: false,
      expressionON: '',
      expressionOFF: 'else',
      valueON: '',
      valueOFF: ''
    })
  }
  // End Update
  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    const editWidget = this.props.editWidget
    e.preventDefault()
    let payload = {
      typeWidget: 'Led',
      title: this.state.title,
      value: this.state.value,
      body: this.state.body,
      datasource: this.state.datasource,
      filter: this.state.filter,
      filterIndex: this.state.filterIndex,
      jsValue: this.state.jsValue,
      manual: this.state.manual,
      expressionON: this.state.expressionON,
      expressionOFF: this.state.expressionOFF,
      valueON: this.state.valueON,
      valueOFF: this.state.valueOFF,
      layout: {
        w: 2,
        h:4,
        minW: 1,
        minH: 3,
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
      <div className="FormCardBox container">
        <FormInputBasic callback={this.handlePayload} values={payload} />
        <ConditionForm event="ON" handlePayload={this.handlePayload} values={payload}/>
        <ConditionForm event="OFF" handlePayload={this.handlePayload} values={payload}/>
        {/* <InputText callback={this.handlePayload} title="Icon" name="icon" value={payload.icon} placeholder="fontAwesome Icon (name Icon) :: tint"/> */}
          
        <SummitBtn handleSubmit={this.handleSubmit} editWidget={this.props.editWidget}/>

      </div>
    )
  }
}
class ConditionForm extends React.Component {
  render () {
    let props = this.props
    return (
      <div class="form-row form-group">
        <label for="inputCity col-2 col-form-label">Condition Light {props.event} :</label>
        <div class="col-3">
          <select id="inputState" class="form-control" 
            name={'expression' + props.event} 
            onChange={props.handlePayload}>
            {(props.event === 'OFF')?<option selected value="else">else</option>:null}
            <option value="="> = </option>
            <option value="≠"> ≠ </option>
            <option value=">"> {'>'} </option>
            <option value="<"> {'<'} </option>
            <option value=">="> >= </option>
            <option value="<="> {'<='} </option>
          </select>
        </div>
        <div class="col">
          <input type="text" class="form-control" name={'value' + props.event} placeholder="Static value" readOnly={(props.event==='OFF'&&props.values.expressionOFF==='else')?true:false}/>
        </div>
      </div>
    )
  }
}
export default FormLed