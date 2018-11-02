import React from 'react'
import WidgetStore from '../store/WidgetStore'
import InputText from './Input/InputText'
import Store from '../store/Store'
import SummitBtn from './SummitBtn'
import FormMultiple from './Input/FormMultiple'
import FormInputBasic from './Input/FormInputBasic'
import InputIcons from './Input/InputIcon'

import './FormImageCover.css'
import reactCSS from 'reactcss'

const $ = require("jquery")

class FormImageCover extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'ImageCover',
      file: null,
      popups: [],
      selectIndex: null
    }
    this.handlePayload = this.handlePayload.bind(this)
    this.handleFile = this.handleFile.bind(this)
  }
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
      title: 'ImageCover',
      file: null,
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
        h:8,
        minW: 6,
        minH: 8,
        maxW: 12,
        maxH: 50
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
      title: 'Popup'+(tmp.length+1),
      position: [],
      forms: [
        {
          title: 'value',
          datasource: '',       
          body: '',
          value: '',
          filter: ',',
          filterIndex: 0,
          unit: '',
          icon: '',
          jsValue: '',
          manual: false,
          required: true
        }
      ],
      shadowEff: {
        index: null,
        min: 0,
        max: 100
      },
      colorEff: {
        index: null,
        colorStart: '#ff0000',
        colorEnd: '#0000ff',
        min: 15,
        max: 30
      }
    })
    this.setState({
      popups: tmp
    })
  }
  addValue = (index) => {
    //console.log(index)
    var tmp = this.state.popups
    tmp[this.state.selectIndex].forms.push({
      title: 'value'+(tmp.length+1),
      datasource: '',       
      body: '',
      value: '',
      filter: ',',
      filterIndex: 0,
      unit: '',
      icon: '',
      jsValue: '',
      manual: false
    })
    this.setState({
      popups: tmp
    })
  }
  selectIndex = (e) => {
    console.log(e)
    this.setState({
      selectIndex: e
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
        <div className="row mt-2 mb-2 text-center">
          <div className="col-12">
            {(payload.file)?<button className="btn btn-primary" type="button" onClick={this.addPopup}><i className="fas fa-plus-square"></i> Add popup</button>:null}
          </div>
        </div>
        {(payload.file)?<ImgArea file={payload.file} value={payload} handlePayload={this.handlePayload}/>:null}
        {
          (payload.file&&payload.popups)?        
            <FormMultiple
            handlePayload={this.handlePayload} 
            title={'Points'}
            hideTitle={true}
            addBtnFunc={this.addPopup}
            selectIndex={this.selectIndex}
            forms={payload.popups}>
              <InputText title="Title" name="title" placeholder="title"/>
              <FormMultiple
              title={'Values'}
              hideTitle={true}
              addBtnFunc={this.addValue}>
                <FormInputBasic/>
                <InputText title="Unit" name="unit" placeholder="unit"/>
                <InputIcons/>
              </FormMultiple>
              <EffectForm/>
            </FormMultiple>:null
            
        }
        <SummitBtn handleSubmit={this.handleSubmit} editWidget={this.props.editWidget} />
      </div>
    )
  }
}
class EffectForm extends React.Component {
  handlePayload = (e) => {
    var tmp = this.props.values.shadowEff
    tmp[e.target.name] = (e.target.value==='')?null:e.target.value
    var obj = {
      target: {
        name: 'shadowEff',
        value: tmp
      }
    }
    this.props.callback(obj)
  }
  render () {
    var values = this.props.values
    var eff = values.shadowEff
    return (
      <div>
        <details>
          <summary>Effect Shadow</summary>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label for="inputState">Value Choose</label>
              <select name="index" 
                value={eff.index}
                onChange={this.handlePayload}
                readOnly
                className="form-control">
                <option value={''}>disable Eff</option>
                {values.forms.map((value,index) => <option value={index}>{value.title}</option>)}
              </select>
            </div>
            <div className="form-group col-md-4">
              <label for="inputCity">Threshold min</label>
              <input type="number" name="min" className="form-control" value={eff.min} onChange={this.handlePayload}/>
            </div>
            <div className="form-group col-md-4">
              <label for="inputZip">Threshold max</label>
              <input type="number" name="max" className="form-control" value={eff.max} onChange={this.handlePayload}/>
            </div>
          </div>
        </details>
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
    this.props.value.popups.map((popup,index) =>
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
          {(popup.title)?popup.title:index+1}
      </div>
    )
    return (
      <div className="row">
        <div className="col-12 text-center">
          <img src={file} className="img-fluid imgbackground" id="b64" alt="" />
          <div className='gridPopupPreview' id="imgcontain" onDrop={this.drop} onDragOver={this.drag_over}>
            {popups}
          </div>
        </div>
      </div>
    )
  }
}
export default FormImageCover