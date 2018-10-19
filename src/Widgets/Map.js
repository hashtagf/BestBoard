
import GoogleMapReact from 'google-map-react';
import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Widget.css'
import HeaderCard from "./HeaderCard"

const AnyReactComponent = ({ text }) => <div>{text}</div>;
class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
  }

  componentDidMount() {
    const payload = this.props.payload
    if (NETPIEMicrogear.statusOnline[payload.datasource]) {
      const microgear = NETPIEMicrogear.microgear[payload.datasource]
      microgear.on('message', this.onMessage.bind(this))
    } else console.log('error : not Connect datasource !!')
  }

  onMessage(topic, msg) {
    const payload = this.props.payload
    const strMsg = msg + ''
    const value = strMsg.split(payload.filter)[payload.filterIndex]
    if (payload.value === topic) {
      this.setState({
        value: value
      })
    }
  }

  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.deleteWidget(widgetId)
  }
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  render() {
    const payload = this.props.payload
    const widgetId = this.props.widgetId
    return (
        <div className="item-content card border-success shadowcard rounded-0 widgetCard border-0 col-12 h-100" data-id={widgetId}>
          <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId} />
          <div className="card-body" style={{height: '300px'}}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyCmONUAkFkKSXNpjjcaihGMVkBZw9vwJzQ' }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
            >
              <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text={'K'}
              />
            </GoogleMapReact>
          </div>
        </div>
    )
  }
}

export default Map