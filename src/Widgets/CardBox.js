/* eslint no-eval: 0 */

import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Widget.css'
import HeaderCard from "./HeaderCard"
// import date from 'date-and-time'

class CardBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      previousValue: null
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
      microgear.on('message', this.onMessage)
      //if (NETPIEMicrogear.topics[payload.datasource][payload.value]) {
      //  this.onMessage(payload.datasource,NETPIEMicrogear.topics[payload.datasource][payload.value].value)
      //}

    } else console.log('error : not Connect datasource !!')
  }
  onMessage = (topic, msg) => {
    const payload = this.props.payload
    if (payload.value === topic) {
      let value = msg + ''
      // let now = new Date();
      if (payload.manual) eval(payload.jsValue)
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
    const state = this.state
    const widgetId = this.props.widgetId
    let arrow = 'up'
    let colorText = 'text-success updown'
    if (state.value - state.previousValue >= 0) arrow = 'up'
    else {
      arrow = 'down'
      colorText = 'text-danger updown'
    }
    return (
        <div className="shadowcard item-content card h-100 rounded-0 widgetCard border-0 col-12" data-id={widgetId}>
          <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body ">
            <div className="row">
            <div className="col-4">
              <i className={payload.icon}></i>
            </div>
            <div className="col-8 text-right">
              <div className="row">
                <h1>{parseFloat(state.value).toFixed(2)}</h1>
              </div>
              <div className="row">
                <h6>{payload.unit}</h6>
              </div>
              <div className="row">
                {(state.previousValue)?
                <span className={colorText}>
                <i className={`fas pt-2 mr-2 fa-angle-` + arrow}></i>
                <span className="fa-layers-counter">{(state.value - state.previousValue).toFixed(2)}</span>
                </span>:null}
              </div>
            </div>
            </div>
          </div>

        </div>
    )
  }
}

export default CardBox