
import GoogleMapReact from 'google-map-react';
import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Widget.css'
import HeaderCard from "./HeaderCard"

const AnyReactComponent = ({ text }) => <i className="fas fa-map-marker-alt markMap" alt={text}></i>;
class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      lat: 0,
      lng: 0,
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    }
  }

  componentDidMount () {
    const payload = this.props.payload.forms
    if (NETPIEMicrogear.statusOnline[payload[0].datasource]) {
      const microgear = NETPIEMicrogear.microgear[payload[0].datasource]
      microgear.on('message', this.onMessage.bind(this))
    } else console.log('error : not Connect datasource !!')
    if (NETPIEMicrogear.statusOnline[payload[1].datasource]) {
      const microgear = NETPIEMicrogear.microgear[payload[1].datasource]
      microgear.on('message', this.onMessage.bind(this))
    } else console.log('error : not Connect datasource !!')
  }

  onMessage (topic, msg) {
    var payload = this.props.payload.forms
    if (payload[0].value === topic || payload[1].value === topic) {
      var index = 1
      var name = 'lng'
      if (payload[0].value === topic){
        index = 0
        name = 'lat'
      }
      payload = payload[index]
      let value = msg + ''
      if (payload.manual) eval(payload.jsValue)
      else value = value.split(payload.filter)[payload.filterIndex]
      this.setState({
        [name]: value,
        center: {
          [name]: value
        }
      })
    }
  }

  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.deleteWidget(widgetId)
  }
  render() {
    const payload = this.props.payload
    const widgetId = this.props.widgetId
    return (
        <div className="item-content card border-success shadowcard rounded-0 widgetCard border-0 col-12 h-100" data-id={widgetId}>
          <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId} />
          <div className="card-body" style={{height: '300px'}}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyCmONUAkFkKSXNpjjcaihGMVkBZw9vwJzQ' }}
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
            >
              <AnyReactComponent
              lat={this.state.lat}
              lng={this.state.lng}
              text={'K'}
              />
            </GoogleMapReact>
          </div>
        </div>
    )
  }
}

export default Map