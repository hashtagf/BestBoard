import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Widget.css'
import HeaderCard from "./HeaderCard"

class CardBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      previousValue: 0,
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
    const stateValue = this.state.value
    if (payload.value === topic) {
      this.setState({
        value: value,
        previousValue: stateValue
      })
    }
  }


  render() {
    const payload = this.props.payload
    const state = this.state
    const widgetId = this.props.widgetId
    let arrow = 'up text-success'
    if (state.value - state.previousValue >= 0) arrow = 'up text-success'
    else arrow = 'down text-danger'
    return (
      <div className="item CardBox col-xl-3 col-lg-4 col-md-6 col-sm-12 text-body mb-3">
        <div className="item-content shadow card rounded-0 widgetCard border-0">
          <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body ">
            <div className="row pb-2">
              <div className="col-6">
                <i className={`fas fa-3x fa-` + payload.icon}></i>
              </div>
            </div>
            <div className="row">
              <div className="col-6 text-right">
                <h2>{parseFloat(state.value).toFixed(2)}</h2>
              </div>
              <div className="col-2 text-left pt-4">
                <h6>{payload.unit}</h6>
              </div>
              <div className="col-4 text-left">
                <span className="fa-layers fa-fw">
                  <i className={`fas fa-2x pt-2 fa-arrow-` + arrow}></i>
                  <span className="fa-layers-counter">{(state.value - state.previousValue).toFixed(2)}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CardBox