import React from 'react'
import WidgetStore from '../store/WidgetStore'
import './Widget.css'
import HeaderCard from "./HeaderCard"
import NETPIEMicrogear from '../store/Microgear'

class HTML extends React.Component {
  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.deleteWidget(widgetId)
  }

  render() {
    const payload = this.props.payload
    const widgetId = this.props.widgetId
    return (
      <div className="shadowcard item-content card rounded-0 widgetCard col-12 h-100 border-0" data-id={widgetId}>
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId} />
        <div className="card-body ">
          <p dangerouslySetInnerHTML={{__html: payload.body}} />
        </div>
      </div>
    )
  }
}

export default HTML