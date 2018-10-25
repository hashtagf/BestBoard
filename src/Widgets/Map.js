/* eslint no-eval: 0 */

import GoogleMapReact from 'google-map-react';
import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Widget.css'
import HeaderCard from "./HeaderCard"

const AnyReactComponent = ({ text }) => <i className="fas fa-map-marker-alt markMap text-primary" alt={text}></i>;
const YourPosition = ({ text }) => <span><i className="fas fa-male markMap text-primary"></i>{text}</span>;
class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 40.6976701,
      lng: 74.2598779
    },
    zoom: 11
  };
  constructor(props) {
    super(props)
    this.state = {
      lat: 0,
      lng: 0,
      center: {
        lat: 50,
        lng: 50
      },
      zoom: 11
    }
  }
  componentWillMount () {
    this.getLocation()
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
      var tmp = this.state.center
      tmp[name] = value
      this.setState({
        [name]: value,
      })
    }
  }
  getLocation () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setCenter);
    }
    else console.log('geolocation not work')
  }
  setCenter = (position) =>{
    this.setState({
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    })
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
          <div className="card-body googlemap">
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyCmONUAkFkKSXNpjjcaihGMVkBZw9vwJzQ' }}
              defaultCenter={this.props.center}
              defaultZoom={this.state.zoom}
            >
              <AnyReactComponent
                lat={this.state.lat}
                lng={this.state.lng}
                text={'K'}
              />
              <YourPosition
                lat={this.state.center.lat}
                lng={this.state.center.lng}
                text={'You are here'}
              />
            </GoogleMapReact>
          </div>
        </div>
    )
  }
}

export default Map