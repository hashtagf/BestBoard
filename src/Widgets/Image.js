import React from 'react'
import WidgetStore from '../store/WidgetStore'
import './Widget.css'
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
        <HeaderCard title={payload.title} del={this.delWidget.bind(this)}/>
          <div className="card-body ">
            <img src={payload.file} className="img-fluid img-thumbnail widgetImage" alt="base64"/>
          </div>
        </div>
      </div>
    )
  }
}

export default Image 