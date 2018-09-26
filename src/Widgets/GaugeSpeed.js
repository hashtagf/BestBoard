import React from 'react'
import WidgetStore from '../../store/WidgetStore'
import ReactSpeedometer from "react-d3-speedometer"

class Gauge extends React.Component {
  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.delWidgetToDB(widgetId)
  }

  render() {
    const payload = this.props.payload
    return (
      <div className="GaugeSpeed col-xl-3 col-lg-4 col-md-6 col-sm-12 text-body mb-3">
        <div className="card border-secondary shadow rounded-0 border-10 widgetCard">
          <h5 className="card-header">{payload.title}</h5>
          <div className="card-body">
            <ReactSpeedometer
              value={parseFloat(payload.value)}
              width={210}
              height={150}
              minValue={parseFloat(payload.minValue)}
              maxValue={parseFloat(payload.maxValue)}
              segments={parseInt(payload.segments, 10)}
              startColor={payload.startColor}
              endColor={payload.endColor}
              textColor={payload.textColor}
            />
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

export default Gauge