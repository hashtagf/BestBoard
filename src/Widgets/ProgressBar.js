import React from 'react'
import { Line } from 'rc-progress'
import NETPIEMicrogear from '../store/Microgear'
import WidgetStore from '../store/WidgetStore'

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
      <div className="item ProgressBar col-xl-3 col-lg-4 col-md-6 col-sm-12 text-body mb-3">
        <div className="item-content card border-warning shadow rounded-0 widgetCard">
          <h5 className="card-header">{payload.title}</h5>
          <div className="card-body">
            <h6 className="pt-5">{payload.title} : {value} {payload.unit}</h6>
            <Line
              percent={parseFloat(value)}
              strokeWidth={parseInt(payload.strokeWidth, 10)}
              trailWidth={parseInt(payload.trailWidth, 10)}
              strokeColor={payload.strokeColor}
              trailColor={payload.trailColor}
              strokeLinecap={payload.strokeLinecap}
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

export default ProgressBar