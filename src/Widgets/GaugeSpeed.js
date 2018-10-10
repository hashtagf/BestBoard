import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import ReactSpeedometer from "react-d3-speedometer"
import HeaderCard from "./HeaderCard"
import './Widget.css'
import Store from '../store/Store'

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
    const strMsg = msg + ''
    const value = strMsg.split(payload.filter)[payload.filterIndex]
    if (payload.value === topic) {
      this.setState({
        value: value,
      })
    }
  }

  render() {
    const payload = this.props.payload
    const value = this.state.value
    return (
      <div className="item GaugeSpeed col-xl-3 col-lg-4 col-md-6 col-12 text-body mb-3">
        <div className="item-content card border-secondary shadow rounded-0 widgetCard">
          <HeaderCard title={payload.title}/>
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
          <div className="card-footer text-right"  id={(Store.mode)?'settingMode':'displayMode'}>
            <a href="/#" data-toggle="modal" data-target=".ModalCreate"><i className="fas fa-cog text-dark mr-3"></i></a>
            <button className="btn" onClick={this.delWidget.bind(this)} ><i className="fas fa-trash-alt text-danger"></i></button>
          </div>
        </div>
      </div>
    )
  }
}

export default Gauge