import React from 'react'
import WidgetStore from '../store/WidgetStore'
import './Widget.css'
import Store from '../store/Store'
import HeaderCard from "./HeaderCard"

class Image extends React.Component {
  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.deleteWidget(widgetId)
  }

  render() {
    const payload = this.props.payload
    return (
      <div className="item Image col-xl-6 col-lg-6 col-md-9 col-12 text-body mb-3">
        <div className="item-content card border-primary shadow rounded-0">
        <HeaderCard title={payload.title}/>
          <div className="card-body ">
            <img src={payload.file} className="img-fluid img-thumbnail widgetImage" alt="base64"/>
          </div>
          <div className="card-footer text-right"  id={(Store.mode)?'settingMode':'displayMode'}>
            <a href="/#" data-toggle="modal" data-target=".ModalCreate"><i className="fas fa-cog text-dark mr-3"></i></a>
            <button className="btn" onClick={this.delWidget.bind(this)} ><i className="fas fa-trash-alt text-danger"></i></button>
          </div>
        </div>
      </div>
    )
  }
}

export default Image 