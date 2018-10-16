import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Widget.css'
import HeaderCard from "./HeaderCard"
import date from 'date-and-time';

class Text extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
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
      let now = new Date();
      this.setState({
        value: value,
        time: now
      })
    }
  } 
  showTime () {

    let now = new Date();
    let time = this.state.time
    time = (typeof time === 'string' || time instanceof String)?new Date(time):time;
    
    let ago = date.subtract(now, time)
    if (ago.toSeconds() <= 60) return ago.toSeconds()+ ' seconds'
    else if (ago.toMinutes() < 60) return ago.toMinutes()+ ' Minutes'
    else if (ago.toHours() < 24) return ago.toHours()+ ' Hours'
    else if(ago.toDays() < 30) return ago.toDays()+ ' Days'
  }
  render() {
    const payload = this.props.payload
    const value = this.state.value
    const widgetId = this.props.widgetId
    return (
      <div className="item Text col-xl-3 col-lg-4 col-md-6 col-12 text-body mb-3" data-id={widgetId}>
      
        <div className="item-content card shadowcard rounded-0 widgetCard border-0">
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body">
            {payload.startText} <strong>{value}</strong> {payload.endText}
          </div>
          <div className="card-footer text-right">
          {/* {this.showTime} */}
          </div>
        </div>
      </div>
    )
  }
}

export default Text