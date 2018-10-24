import React from 'react'
import GoogleMapReact from 'google-map-react';
import WidgetStore from '../store/WidgetStore'
import InputText from './Input/InputText'
import FormInputBasic from './Input/FormInputBasic'
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
      file: 'empty',
      selectPoint: 0,
      popups: [],
      search: ''
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
  componentWillReceiveProps(nextProps) {
    let editWidget = nextProps.editWidget
    if (editWidget) {
      Object.keys(editWidget).forEach((objectKey) => {
        if (objectKey !== 'widgetId') {
          return this.setState({
            [objectKey]: editWidget[objectKey]
          })
        }
      });
    }
    else this.reState()
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
      file: this.state.file,
      popups: this.state.popups,
      layout: {
        w: 3,
        h:6,
        minW: 3,
        minH: 5,
        maxW: 12,
        maxH: 6
      }
    }
    if (editWidget)
      WidgetStore.updateWidget(editWidget.widgetId, payload)
    else
      WidgetStore.createWidget(Store.currentId, payload)
    this.reState()
  }
  addPopup = (e) => {
    var tmp = this.state.popups
    tmp.push({
      title: 'Gauge',
      datasource: '',       
      body: '',
      value: '',
      filter: ',',
      filterIndex: 0,
      unit: '',
      icon: '',
      jsValue: '',
      manual: false,
      position: []
    })
    this.setState({
      popups: tmp
    })
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
        <FormInputBasic callback={this.handlePayload} values={payload} />
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
        <div className="row mt-2 mb-2 text-center">
          <div className="col-12">
            <a className="btn" onClick={this.addPopup}>Add popup</a>
          </div>
        </div>
        {
          (payload.popups)?<FormPopups payload={payload} handlePayload={this.handlePayload}/>:null
        }

        <SummitBtn handleSubmit={this.handleSubmit} editWidget={this.props.editWidget} />
      </div>
    )
  }
}

class FormPopups extends React.Component {
  handlePayload = (e) => {
    var tmp = this.props.payload.popups
    var index = parseInt(this.props.payload.selectPoint,10)
    tmp[index][e.target.name] = e.target.value
    var obj = {
      target: {
        name: 'popups',
        value: tmp
      }
    }
    this.props.handlePayload(obj)
  }
  render () {
    const payload = this.props.payload
    var buttons = payload.popups.map((popup,index) =>
        <button key={index} className={(payload.selectPoint === index+'')?'btn btn-primary':'btn'} type="button" name="selectPoint" value={index} data-toggle="collapse" data-target={"#form"+index} aria-expanded={(payload.selectPoint === index+'')?"true":"false"} aria-controls={"form"+index} onClick={this.props.handlePayload}>
            {index+1}
        </button>
    );
    var forms = payload.popups.map((popup,index) =>
          <div key={index} id={"form"+index} className={(payload.selectPoint === index+'')?'collapse show':'collapse'} aria-labelledby="headingOne" data-parent="#popupForm">
            <FormInputBasic callback={this.handlePayload} values={popup} />
          </div>
    );
    return (
      <div className="accordion" id="popupForm">
        <div className="form-group row">
            <label htmlFor="value" className="col-3 col-form-label">
              Form :
              </label>
            <div className="col-9">
              <div className="btn-group" role="group" aria-label="Basic example">
                  {buttons}
              </div>
            </div>
          </div>
          {forms}
        </div>
    )
  }
}

export default FormMap