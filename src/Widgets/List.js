import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Widget.css'
import HeaderCard from "./HeaderCard"
import date from 'date-and-time'

class Lists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      store: {
        topic: '',
        msg: ''
      }
    }
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
      let data = this.state.data
      const value = strMsg.split(payload.filter)[payload.filterIndex]
      data.push({
        text: payload.text,
        value: value,
        unit: payload.unit,
        timestamp: Date.now()
      })
      this.setState({
        store: {
          topic: topic + "",
          msg: msg + ""
        },
        data: data
      })
    }
  }

  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.deleteWidget(widgetId)
  }

  render() {
    const data = this.state.data
    const payload = this.props.payload
    const icon = payload.icon
    const widgetId = this.props.widgetId
    const mapList = data.map((payload, index) =>
      <List key={index} recent={index===data.length-1} payload={payload} icon={icon} />
    )
    return (

        <div className="item-content List card shadowcard rounded-0 h-100 widgetCard border-0 col-12" data-id={widgetId}>
          <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body m-0 p-0" id="scrollbar-style">
            <ul className="list-group" data-spy="scroll">
              {mapList.reverse()}
            </ul>
          </div>
        </div>
    )
  }
}

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0
    }
  }
  showTime (time) {
    let now = new Date()
    time =new Date(time)
    let ago = date.subtract(now, time)
    if (ago.toSeconds() === 0) return 'now'
    else if (ago.toSeconds() < 60) return ago.toSeconds()+ ' seconds'
    else if (ago.toMinutes() < 60) return ago.toMinutes()+ ' Minutes'
    else if (ago.toHours() < 24) return ago.toHours()+ ' Hours'
    else if(ago.toDays() < 30) return ago.toDays()+ ' Days'
  }
  componentWillMount () {
    setInterval(this.change, 7000)
  }
  change = () => {
    this.setState({
        counter: this.state.counter + 1
    })
  }
  render() {
    const payload = this.props.payload
    const icon = this.props.icon
    return (
      <li className={(this.props.recent)?"list-group-item list-group-item-action":"list-group-item"}>
        <div className="row">
          <div className="col-2 m-0 p-0">
            <span className="fa-layers fa-fw icon" >
              <i className={'fab fa-2x ' + icon}></i>
            </span>
          </div>
          <div className="col-9">
            <div className="row">
              <strong>{payload.text + ' '}</strong> {payload.value}{' ' + payload.unit}
            </div>
            <div className="row">
              <small>{this.showTime(payload.timestamp)}</small>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default Lists