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
    const strMsg = msg + ''
    if (payload.value === topic) {
      const value = strMsg.split(payload.filter)[payload.filterIndex]
      this.setState({
        value: value
      })
    }
  }

  componentWillUnMount() {
    this.setState({
      value: 0
    })
  }

  render() {
    const payload = this.props.payload
    const value = this.state.value
    return (
      <div className="item Progress col-xl-3 col-lg-4 col-md-6 col-12 text-body mb-3">
        <div className="item-content card shadow rounded-0 widgetCard">
        <HeaderCard title={payload.title} del={this.delWidget.bind(this)}/>
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
              maxValue={parseInt(payload.maxvalue, 10)}
              //scaleList={payload.setColor}
            />
          </div>

        </div>
      </div>
    )
  }
}

export default Progress