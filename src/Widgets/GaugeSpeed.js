import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import ReactSpeedometer from "react-d3-speedometer"

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

  componentWillMount() {
    const payload = this.props.payload
    const microgear = NETPIEMicrogear.microgear[payload.datasource]
    microgear.on('message', this.onMessage.bind(this))
  }

  onMessage(topic, msg) {
    const payload = this.props.payload
    const strMsg = msg + ''
    if (payload.value === topic) {
      this.setState({
        value: strMsg.split(payload.filter)[payload.filterIndex],
      })
    }
  }

  render() {
    const payload = this.props.payload
    const value = this.state.value
    return (
      <div className="item GaugeSpeed col-xl-3 col-lg-4 col-md-6 col-sm-12 text-body mb-3">
        <div className="item-content card border-secondary shadow rounded-0 widgetCard">
          <h5 className="card-header">{payload.title}</h5>
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
          <div className="card-footer text-right">
            <a href="/#" data-toggle="modal" data-target=".ModalCreate"><i className="fas fa-cog text-dark mr-3"></i></a>
            <button className="btn" onClick={this.delWidget.bind(this)} ><i className="fas fa-trash-alt text-danger"></i></button>
          </div>
        </div>
      </div>
    )
  }
}

export default Gauge