import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Toggle.css'
import './Widget.css'
import HeaderCard from "./HeaderCard"


class CardBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  handleChange = (e) => {
    const payload = this.props.payload
    const microgear = NETPIEMicrogear.microgear[payload.datasource]
    const checked = e.target.checked
    this.setState({
      checked: checked
    })
    console.log(checked)
    if (NETPIEMicrogear.statusOnline[payload.datasource]) {
      switch (payload.type) {
        case 'chat':
          if (checked) return microgear.chat(payload.tpaOn, payload.valueOn)
          else return microgear.chat(payload.tpaOff, payload.valueOff)
        case 'publish':
          if (checked) return microgear.publish(payload.tpaOn, payload.valueOn)
          else return microgear.publish(payload.tpaOff, payload.valueOff)
        default: return console.log('Error')
      }
    } else console.log('error : not Connect datasource !!')
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
        previousValue: this.state.value
      })
    }
  }


  render() {
    const payload = this.props.payload
    const checked = this.state.checked
    console.log(payload)
    return (
      <div className="item CardBox col-xl-3 col-lg-4 col-md-6 col-12 text-body mb-3">
        <div className="item-content card shadow rounded-0 widgetCard border-0">
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)}/>
          <div className="card-body ">
            <span className="switch">
              <input type="checkbox" className="switch switch-lg" id="switch-id" onChange={this.handleChange} checked={checked}/>
              <label htmlFor="switch-id"></label>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default CardBox