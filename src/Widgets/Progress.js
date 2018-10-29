/* eslint no-eval: 0 */
import React from 'react'
import CanvasGauge from 'react-canvas-gauge'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Widget.css'
import HeaderCard from "./HeaderCard"

class Progress extends React.Component {
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

  componentWillUnMount() {
  }

  render() {
    const payload = this.props.payload
    const value = this.state.value
    const widgetId = this.props.widgetId
    return (
        <div className="item-content card shadowcard rounded-0 h-100 widgetCard border-0 col-12" data-id={widgetId}>
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body">
            <CanvasGauge
              className="mx-0 px-0"
              value={parseInt(value, 10)}
              theme={payload.theme}
              mode={payload.mode}
              size={150}
              enableAnimation={payload.enableAnimation}
              //title={payload.title}
              unit={payload.unit}
              minValue={parseInt(payload.minvalue, 10)}
              // maxValue={parseInt(payload.maxvalue, 10)}
              //scaleList={payload.setColor}
            />
          </div>

        </div>
    )
  }
}

export default Progress