/* eslint no-eval: 0 */

import React from 'react'
import WidgetStore from '../store/WidgetStore'
import './Widget.css'
import './Led.css'
import HeaderCard from "./HeaderCard"

class Image extends React.Component {
  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.deleteWidget(widgetId)
  }

  render() {
    const payload = this.props.payload
    const widgetId = this.props.widgetId
    return (
      <div className="item Image col-xl-2 col-lg-2 col-md-2 col-2 text-body mb-3" data-id={widgetId}>
        <div className="item-content card shadowcard rounded-0 border-0">
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body ">
            <span class="led on"></span>
          </div>
        </div>
      </div>
    )
  }
}

export default Image 