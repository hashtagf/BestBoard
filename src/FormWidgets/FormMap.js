import React from 'react'
import GoogleMapReact from 'google-map-react';
import WidgetStore from '../store/WidgetStore'
import InputText from './Input/InputText'
// import FormInputBasic from './Input/FormInputBasic'
import FormMulti from './Input/FormMulti'
import Store from '../store/Store'
import SummitBtn from './SummitBtn'
import './FormImageCover.css'
// import reactCSS from 'reactcss'
// const $ = require("jquery")
const AnyReactComponent = ({ text }) => <i className="fas fa-map-marker-alt markMap" alt={text}></i>;

class FormMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Map',
      forms: [
        {
          title: 'Latitude',
          value: '',
          datasource: '',
          body: '',
          filter: ',',
          filterIndex: 0,
          jsValue: '',
          manual: false,
        },
        {
          title: 'Longitude',
          value: '',
          datasource: '',
          body: '',
          filter: ',',
          filterIndex: 0,
          jsValue: '',
          manual: false,
        }
      ],
      lat : 59.955413,
      lng: 30.337844
    }
    this.handlePayload = this.handlePayload.bind(this)
  }
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  componentDidMount() {
    let editWidget = this.props.editWidget
    if (editWidget) {
      Object.keys(editWidget).forEach((objectKey) => {
        if (objectKey !== 'widgetId') {
          return this.setState({
            [objectKey]: editWidget[objectKey]
          })
        }
      })
    }
    else this.reState()
  }

  componentWillReceiveProps(nextProps){
    let editWidget = nextProps.editWidget
    if (editWidget) {
      Object.keys(editWidget).forEach((objectKey) => {
        if (objectKey !== 'widgetId') {
          return this.setState({
            [objectKey]: editWidget[objectKey]
          })
        }
      })
    } else this.reState()
  }

  reState () {
    this.setState({
      title: 'Map',
      file: 'empty',
      popups: []
    })
  }
  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const editWidget = this.props.editWidget
    let payload = {
      typeWidget: 'Map',
      title: this.state.title,
      forms: this.state.forms,
      layout: {
        w: 3,
        h:8,
        minW: 3,
        minH: 8,
        maxW: 12,
        maxH: 10
      }
    }
    if (editWidget)
      WidgetStore.updateWidget(editWidget.widgetId, payload)
    else
      WidgetStore.createWidget(Store.currentId, payload)
    this.reState()
  }
  setPosition = ()=> {
    /* const forms = this.state.forms
    if (forms[0].value&&forms[1].value) {
      let value = msg + ''
      if (payload.manual) eval(payload.jsValue)
      else value = value.split(payload.filter)[payload.filterIndex]
      const stateValue = this.state.value
      this.setState({
        lat: value,
        lng: 0
      })
    } */
  }
  render() {
    const payload = this.state
    return (
      <div className="FormProgressBar container">
        <InputText
          callback={this.handlePayload}
          title="Title"
          name="title"
          value={payload.title} />
          <FormMulti payload={payload} 
          handlePayload={this.handlePayload} 
          title={'Position'}
          formsbtn={['Latitude','Longitude']}
          forms={payload.forms}/>
        <div className="card-body" style={{height: '300px'}}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCmONUAkFkKSXNpjjcaihGMVkBZw9vwJzQ' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
            lat={payload.lat}
            lng={payload.lng}
            text={'K'}
            />
          </GoogleMapReact>
        </div>

        <SummitBtn handleSubmit={this.handleSubmit} editWidget={this.props.editWidget} />
      </div>
    )
  }
}


export default FormMap