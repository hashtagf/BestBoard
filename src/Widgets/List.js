import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Widget.css'
import HeaderCard from "./HeaderCard"

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
      <List key={index} payload={payload} icon={icon} />
    )
    return (
      <div className="item List col-xl-3 col-lg-4 col-md-6 col-12 text-body mb-3" data-id={widgetId}>zz
        <div className="item-content card shadowcard rounded-0 widgetCard border-0">
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body m-0 p-0">
            <ul className="list-group" data-spy="scroll">
              {mapList.reverse()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

class List extends React.Component {
  render() {
    const payload = this.props.payload
    const icon = this.props.icon
    return (
      <li className="list-group-item list-group-item-action">
        <div className="row">
          <div className="col-2 m-0 p-0">
            <span className="fa-layers fa-fw" >
              <i className={'fas fa-2x fa-' + icon}></i>
            </span>
            <small>{payload.timestamp}</small>

          </div>
          <div className="col-9 text-secondary">
            {payload.text + ' '}
            {payload.value}
            {' ' + payload.unit}
          </div>
        </div>
      </li>
    )
  }
}

export default Lists