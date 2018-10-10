import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Toggle.css'

class CardBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleChange = (e) => {
    const payload = this.props.payload
    const microgear = NETPIEMicrogear.microgear[payload.datasource]
    if (NETPIEMicrogear.statusOnline[payload.datasource]) {
      switch (payload.type) {
        case 'chat':
          if (e.target.value) return microgear.chat(payload.tpaOn, payload.valueOn)
          else return microgear.chat(payload.tpaOff, payload.valueOff)
        case 'publish':
          if (e.target.value) return microgear.publish(payload.tpaOn, payload.valueOn)
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
    return (
      <div className="item CardBox col-xl-3 col-lg-4 col-md-6 col-sm-12 text-body mb-3">
        <div className="item-content card rounded-0 widgetCard">
          <h5 className="card-header">{payload.title}</h5>
          <div className="card-body ">
            <span className="switch">
              <input type="checkbox" className="switch switch-lg" id="switch-id" onChange={this.handleChange} />
              <label htmlFor="switch-id"></label>
            </span>
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

export default CardBox