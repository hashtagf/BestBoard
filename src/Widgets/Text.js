import React from 'react'
import WidgetStore from '../store/WidgetStore'
import Store from '../store/Store'
import NETPIEMicrogear from '../store/Microgear'
import './Widget.css'
import HeaderCard from "./HeaderCard"

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
      this.setState({
        value: value,
      })
    }
  } 

  render() {
    const payload = this.props.payload
    const value = this.state.value
    return (
      <div className="item Text col-xl-3 col-lg-4 col-md-6 col-12 text-body mb-3">
        <div className="item-content card shadow rounded-0 widgetCard">
        <HeaderCard title={payload.title}/>
          <div className="card-body">
            {payload.startText} <strong>{value}</strong> {payload.endText}
          </div>
          <div className="card-footer text-right" id={(Store.mode)?'settingMode':'displayMode'}>
            <a href="/#" data-toggle="modal" data-target=".ModalCreate"><i className="fas fa-cog text-dark mr-3"></i></a>
            <button className="btn" onClick={this.delWidget.bind(this)} ><i className="fas fa-trash-alt text-danger"></i></button>
          </div>
        </div>
      </div>
    )
  }
}

export default Text