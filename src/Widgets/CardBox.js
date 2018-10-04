import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'

class CardBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      previousValue: 0,
      store: {
        topic: '',
        msg: ''
      }
    }
  }

  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.deleteWidget(widgetId)
  }

  componentWillMount() {
    const microgear = NETPIEMicrogear.microgear
    microgear.on('message', this.onMessage.bind(this))
  }

  onMessage(topic, msg) {
    const payload = this.props.payload
    if (payload.value === topic) {
      this.setState({
        store: {
          topic: topic + "",
          msg: msg + ""
        }
      })
      this.setState({
        value: this.state.store.msg.split(",")[0],
        previousValue: this.state.value
      })
    }
  }


  render() {
    const payload = this.props.payload
    const state = this.state
    let arrow = 'up text-success'
    if (state.value - state.previousValue >= 0) arrow = 'up text-success'
    else arrow = 'down text-danger'
    return (
      <div className="CardBox col-xl-3 col-lg-4 col-md-6 col-sm-12 text-body mb-3 item">
        <div className="card rounded-0 border-10 widgetCard item-content">
          <h5 className="card-header">{payload.title}</h5>
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