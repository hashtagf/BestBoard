import React from 'react'
import CanvasGauge from 'react-canvas-gauge'
import WidgetStore from '../store/WidgetStore'
import Microgear from '../store/Microgear'

class Gauge extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
  }

  componentWillMount() {
    const microgear = Microgear.microgear
    microgear.on('closed', () => console.log('Close'))
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
        value: this.state.store.msg.split(",")[0]
      })
    }
  }

  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.delWidgetToDB(widgetId)
  }

  render() {
    const payload = this.props.payload
    const value = this.state.value
    return (
      <div className="Guage col-xl-3 col-lg-4 col-md-6 col-sm-12 text-body mb-3">
        <div className="card border-success shadow rounded-0 border-10 widgetCard">
          <h5 className="card-header">{payload.title}</h5>
          <div className="card-body">
            <CanvasGauge
              value={parseInt(value, 10)}
              theme={payload.theme}
              mode={payload.mode}
              size={150}
              enableAnimation={payload.enableAnimation}
              //title={payload.title}
              unit={payload.unit}
              minValue={parseInt(payload.minvalue, 10)}
              maxValue={parseInt(payload.maxvalue, 10)}
            //scaleList={payload.setColor}
            />
          </div>
          <div className="card-footer text-right">
            <a href="/#" data-toggle="modal" data-target=".ModalCreate"><i className="fas fa-cog text-dark mr-3"></i></a>
            <button className="btn" onClick={this.delWidget.bind(this)} ><i className="fas fa-trash-alt text-danger"></i></button>          </div>
        </div>
      </div>
    )
  }
}

export default Gauge