/* eslint no-eval: 0 */

import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Toggle.css'
import './Widget.css'
import HeaderCard from "./HeaderCard"


class Toggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  handleChange = (e) => {
    const checked = e.target.checked
    this.setState({
      checked: checked
    }, this.contactMicrogear)
    
  }

  contactMicrogear () {
    const checked = this.state.checked
    const payload = this.props.payload
    const microgear = NETPIEMicrogear.microgear[payload.datasource]
    
    if (NETPIEMicrogear.statusOnline[payload.datasource]) {
      switch (payload.type) {
        case 'chat':
          if (checked) return microgear.chat(payload.tpaOn, payload.valueOn)
          else return microgear.chat(payload.tpaOff, payload.valueOff)
        case 'publish':
          if (checked) return microgear.publish(payload.tpaOn, payload.valueOn + '')
          else return microgear.publish(payload.tpaOff, payload.valueOff)
        default: return console.log('Error')
      }
    } else console.log('error : not Connect datasource !!')
  }

  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.deleteWidget(widgetId)
  }

  componentDidMount() {
    const payload = this.props.payload
    if (NETPIEMicrogear.statusOnline[payload.datasource]) {
      const microgear = NETPIEMicrogear.microgear[payload.datasource]
      microgear.chat(payload.onCreated, payload.onCreatedValue)
      microgear.on('message', this.onMessage.bind(this))
    } else console.log('error : not Connect datasource !!!')
  }

  onMessage(topic, msg) {
    const payload = this.props.payload
    const strMsg = msg + ''
    const value = strMsg
    if (payload.toggleState === topic) {
      if(payload.toggleValue + '' === value) {
        this.setState({
          checked: true
        })
      } else {
        this.setState({
          checked: false
        })
      }   
    }
  }


  render() {
    const payload = this.props.payload
    const checked = this.state.checked
    const widgetId = this.props.widgetId
    return (
        <div className="item-content card shadowcard rounded-0 widgetCard border-0 h-100 Toggle col-12" data-id={widgetId}>
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body ">
            <span className="switch">
              <input type="checkbox" className="switch switch-lg" id={widgetId} onChange={this.handleChange} checked={checked}/>
              <label htmlFor={widgetId}></label>
            </span>
          </div>
        </div>
    )
  }
}

export default Toggle
