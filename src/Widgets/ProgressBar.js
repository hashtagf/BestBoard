/* eslint no-eval: 0 */
import React from 'react'
import { Line } from 'rc-progress'
import NETPIEMicrogear from '../store/Microgear'
import WidgetStore from '../store/WidgetStore'
import './Widget.css'
import HeaderCard from "./HeaderCard"
import Store from '../store/Store'

class ProgressBar extends React.Component {
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
      this.setState({
        value: value
      })
    }
  }

  render() {
    const payload = this.props.payload
    const value = this.state.value
    const widgetId = this.props.widgetId
    var strokeColor = payload.strokeColor
    var trailColor = payload.trailColor
    if (payload.strokeColor === 'auto') strokeColor = Store.colorSet[Store.colorUse].colors[2]
    if (payload.trailColor === 'auto') strokeColor = Store.colorSet[Store.colorUse].colors[0]
    return (
        <div className="item-content card shadowcard rounded-0 widgetCard border-0  ProgressBar col-12 h-100"  data-id={widgetId}>
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body">
            <h6 className="">{payload.title} : {value} {payload.unit}</h6>
            <Line
              percent={parseFloat(value)}
              strokeWidth={parseInt(payload.strokeWidth, 10)}
              trailWidth={parseInt(payload.trailWidth, 10)}
              strokeColor={strokeColor}
              trailColor={trailColor}
              strokeLinecap={payload.strokeLinecap}
            />
          </div>

        </div>
    )
  }
}

export default ProgressBar