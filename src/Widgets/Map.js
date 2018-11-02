/* eslint no-eval: 0 */

import GoogleMapReact from 'google-map-react';
import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Widget.css'
import HeaderCard from "./HeaderCard"

const MarkComponent = ({ text,url }) => <a href={url} target="_blank"><i className="fas fa-map-marker-alt markMap text-primary" alt={text}></i></a>;
const YourPosition = ({ text }) => <span className="labelmark text-dark"><i className="fas fa-male markMap text-primary" alt={text}></i></span>;
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
      points: [
      ],
      center: 
        {
        lat: 50,
        lng: 50
        },
      zoom: 11
    }
  }
  componentWillMount () {
    const count = this.props.payload.forms.length
    var tmp = this.state.points
    tmp.length = count
    //var tmp = Array.apply(null, Array(count)).map(function () {return 0})
    this.setState({
      points: tmp
    })
    this.getLocation()
  }

  componentDidMount () {
    const payload = this.props.payload.forms
    payload.map((point, x) => {
      point.forms.map((value, y) => {
          let datasource = value.datasource
          if (NETPIEMicrogear.statusOnline[datasource]) {
            const microgear = NETPIEMicrogear.microgear[datasource]
            microgear.on('message', this.onMessage.bind(this, value, x, y))
          } else console.log('error : not Connect datasource !!')
          return 0
      })
      return 0
    })
  }

  onMessage = (payload,x,y,topic, msg) => {
    if (payload.value === topic) {
      var name = 'lng'
      if (y === 0) name = 'lat'

      let value = msg + ''
      if (payload.manual&&payload.manual!=='false') {
        try {eval(payload.jsValue)}
        catch (err){
          if(err!==null) value = msg + ''
        }
      }
      else value = value.split(payload.filter)[payload.filterIndex]
      var tmp = this.state.points
      if (!tmp[x]) tmp[x] = {}
      tmp[x][name] = value
      this.setState({
        points: tmp
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
        <div className="item-content Map card border-success shadowcard rounded-0 widgetCard border-0 col-12 h-100" data-id={widgetId}>
          <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId} />
          <div className="card-body googlemap">
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyCmONUAkFkKSXNpjjcaihGMVkBZw9vwJzQ' }}
              center={this.state.center}
              defaultZoom={this.state.zoom}
            >
              {
                this.state.points.map((point,index) => {
                  var markDetail = payload.forms[index]
                  if (!point.lat || !point.lng) {
                    return null
                  }
                  return <MarkComponent
                  key={index}
                  lat={point.lat}
                  lng={point.lng}
                  text={markDetail.title}
                  url={markDetail.url}
                />
                })
              }
              
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