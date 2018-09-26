import React from 'react'
import axios from 'axios'
import WidgetStore from '../../store/WidgetStore'

class CardBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      previousValue: 0
    }
  }

  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.delWidgetToDB(widgetId)
  }

  componentDidMount() {
    axios.get('http://localhost:5582/netpie/' + this.props.payload.value).then(function (res) {
      const data = res.data[0].payload.split(",")
      this.setState({
        value: data[0]
      })
      console.log(data)
    }.bind(this))
  }


  render() {
    const payload = this.props.payload
    const state = this.state

    let arrow = 'up text-success'
    if (state.value - state.previousValue >= 0) arrow = 'up text-success'
    else arrow = 'down text-danger'
    return (
      <div className="CardBox col-xl-3 col-lg-4 col-md-6 col-sm-12 text-body mb-3">
        <div className="card border-primary shadow rounded-0 border-10 widgetCard">
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