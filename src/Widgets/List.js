import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'

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

  componentWillMount() {
    const payload = this.props.payload
    const microgear = NETPIEMicrogear.microgear[payload.datasource]
    microgear.on('message', this.onMessage.bind(this))
  }

  onMessage(topic, msg) {
    const payload = this.props.payload
    const strMsg = msg + ''
    if (payload.value === topic) {
      let data = this.state.data
      data.push({
        text: payload.text,
        value: strMsg.split(payload.filter)[payload.filterIndex],
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
    const mapList = data.map((payload, index) =>
      <List key={index} payload={payload} icon={icon} />
    )
    return (
      <div className="item List col-xl-3 col-lg-4 col-md-6 col-sm-12 text-body mb-3">
        <div className="item-content card border-info shadow rounded-0 border-10 widgetCard">
          <h5 className="card-header">{payload.title}</h5>
          <div className="card-body m-0 p-0">
            <ul className="list-group" data-spy="scroll">
              {mapList.reverse()}
            </ul>
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