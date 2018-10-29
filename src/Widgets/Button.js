/* eslint no-eval: 0 */

import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Widget.css'
import HeaderCard from "./HeaderCard"

class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleClick = () => {
    const payload = this.props.payload
    const microgear = NETPIEMicrogear.microgear[payload.datasource]
    switch (payload.type) {
      case 'chat' :
        return microgear.chat(payload.tpa, payload.value)
      case 'publish':
        return microgear.publish(payload.tpa, payload.value)
      default : return console.log('Error')
    }
    
  }

  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.deleteWidget(widgetId)
  }

  componentDidMount() {
    const payload = this.props.payload
    if (NETPIEMicrogear.statusOnline[payload.datasource]) {
      const microgear = NETPIEMicrogear.microgear[payload.datasource]
      microgear.on('message', this.onMessage.bind(this))
    } else console.log('error : not Connect datasource !!')
  }

  onMessage(topic, msg) {
    const payload = this.props.payload
    if (payload.value === topic) {
      let value = msg + ''
      if (payload.manual) {
        try {eval(payload.jsValue)}
        catch (err){
          if(err!==null) value = msg + ''
        }
      }
      else value = value.split(payload.filter)[payload.filterIndex]
      const stateValue = this.state.value
      this.setState({
        value: value,
        previousValue: stateValue
      })
    }
  }


  render() {
    const payload = this.props.payload
    const widgetId = this.props.widgetId
    return (
        <div className="shadowcard item-content Button card rounded-0 widgetCard col-12 h-100 border-0" data-id={widgetId}>
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body ">
            <button 
              onClick={this.handleClick}
              className="btn btn-primary"
            >
              {payload.label}
            </button>
          </div>
        </div>
    )
  }
}

export default Button