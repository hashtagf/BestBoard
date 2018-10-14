import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Widget.css'
import HeaderCard from "./HeaderCard"

class CardBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleClick = () => {
    const payload = this.props.payload
    const microgear = NETPIEMicrogear.microgear[payload.datasource]
    switch (payload.type) {
      case 'chat' :
        return microgear.chat(payload.tpa, payload.value)
      case 'publish':
        return microgear.publish(payload.tpa, payload.value)
      default : return console.log('Error')
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
        previousValue: this.state.value
      })
    }
  }


  render() {
    const payload = this.props.payload
    const widgetId = this.props.widgetId
    return (
      <div className="item CardBox col-xl-3 col-lg-4 col-md-6 col-12 text-body mb-3">
        <div className="item-content shadowcard card rounded-0 widgetCard border-0">
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body ">
            <button 
              onClick={this.handleClick}
              className="btn btn-primary btn-block"
            >
              {payload.label}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default CardBox