import React from 'react'
import GoogleMapReact from 'google-map-react';
import WidgetStore from '../store/WidgetStore'
import InputText from './Input/InputText'
import FormInputBasic from './Input/FormInputBasic'
import Store from '../store/Store'
import SummitBtn from './SummitBtn'
import './FormImageCover.css'
import reactCSS from 'reactcss'
const $ = require("jquery")
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class FormImageCover extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Map',
      file: 'empty',
      selectPoint: 0,
      popups: []
    }
    this.handlePayload = this.handlePayload.bind(this)
    this.handleFile = this.handleFile.bind(this)
  }
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

  handleFile(e) {
    if (e.target.files && e.target.files[0]) {

      var FR = new FileReader()
      FR.onloadend = () => {
        // document.getElementById("b64").src = FR.result
        this.setState({
          file: FR.result
        })
      }
      FR.readAsDataURL(e.target.files[0])
    }
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
        minH: 5
      }
    }
    if (editWidget)
      WidgetStore.updateWidget(editWidget.widgetId, payload)
    else
      WidgetStore.createWidget(Store.currentId, payload)
    this.reState()
    document.getElementById('b64').src = ''
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
    console.log(this.state.popups)
    return (
      <div className="FormProgressBar container">
        <InputText
          callback={this.handlePayload}
          title="Title"
          name="title"
          value={payload.title} />
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
class ImgArea extends React.Component {  
  drag_start = (event) => {
    var style = window.getComputedStyle(event.target, null);
    var str = (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY)+ ',' + event.target.id;
    event.dataTransfer.setData("Text",str);
  } 

  drop = (event) => {
    var offset = event.dataTransfer.getData("Text").split(',');
    var dm = document.getElementById(offset[2]);
    var h = $('#imgcontain').innerHeight();
    var w = $('#imgcontain').innerWidth();
    var x = (event.clientX + parseInt(offset[0],10))/w*100.0 + '%';
    var y = (event.clientY + parseInt(offset[1],10))/h*100.0 + '%';
    dm.style.left = x
    dm.style.top = y
    var index = parseInt(offset[2].substr(4, 5),10)
    event.target.name = 'popups'
    var temp = this.props.value.popups
    temp[index].position = [x,y]
    event.target.value = temp
    this.props.handlePayload(event)
    event.preventDefault();
    return false;
  }

  drag_over (event) {
    event.preventDefault();
    return false;
  }
  render () {
    const file = this.props.file
    var stylesObj = {}
    this.props.value.popups.map( (popup,index) =>
      stylesObj['item'+index] = {
        left: popup.position[0],
        top: popup.position[1]
      }
    )
    var styles = reactCSS({
      'default': stylesObj
    })
    var popups = this.props.value.popups.map((popup,index) =>
      <div className="item rounded-circle" key={index} id={'item'+index} name={'item'+index} draggable="true" onDragStart={this.drag_start} style={styles['item'+index]}>
          {index+1}
      </div>
    )
    return (
      <div className="row">
        <div className="col-12">
          <img src={file} className="img-fluid" id="b64" alt="" />
          <div className='gridPopupPreview' id="imgcontain" onDrop={this.drop} onDragOver={this.drag_over}>
            {popups}
          </div>
        </div>
      </div>
    )
  }
}
export default FormImageCover