import React from 'react'
import WidgetStore from '../store/WidgetStore'
import InputText from './Input/InputText'
import FormInputBasic from './Input/FormInputBasic'
import Store from '../store/Store'
import SummitBtn from './SummitBtn'
import './FormImageCover.css'
import reactCSS from 'reactcss'
const $ = require("jquery")

class FormImageCover extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Image',
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
      title: 'Image',
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
      typeWidget: 'ImageCover',
      title: this.state.title,
      file: this.state.file,
      popups: this.state.popups,
      layout: {
        w: 10,
        h:6,
        minW: 6,
        minH: 5,
        maxW: 12,
        maxH: 12
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
    return (
      <div className="FormProgressBar container">
        <InputText
          callback={this.handlePayload}
          title="Title"
          name="title"
          value={payload.title} />
        <div className="form-group row">
          <label htmlFor="file" className="col-3 col-form-label">
            File :
            </label>
          <div className="col-9">
            <div className="input-group">
              <div className="custom-file">
                <input id="uploadImg"
                  aria-describedby="uploadImg"
                  name="path"
                  type="file"
                  className="custom-file-input"
                  onChange={this.handleFile}
                />
                <label className="custom-file-label" htmlFor="uploadImg">Choose file</label>
              </div>
            </div>
          </div>
        </div>
        <ImgArea file={payload.file} value={payload} handlePayload={this.handlePayload}/>
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