/* eslint no-eval: 0 */

import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import ReactSpeedometer from "react-d3-speedometer"
import HeaderCard from "./HeaderCard"
import './Widget.css'

class Gauge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
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
    const value = this.state.value
    const widgetId = this.props.widgetId
    return (

        <div className="item-content card shadowcard rounded-0 widgetCard border-0 h-100 GaugeSpeed col-12" data-id={widgetId}>
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body">
            <ReactSpeedometer
              value={parseFloat(value)}
              width={210}
              height={150}
              minValue={parseFloat(payload.minValue)}
              maxValue={parseFloat(payload.maxValue)}
              segments={parseInt(payload.segments, 10)}
              startColor={payload.startColor}
              endColor={payload.endColor}
              textColor={payload.textColor}
            />
          </div>
        </div>
    )
  }
}

export default Gauge