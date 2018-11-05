/* eslint no-eval: 0 */

import React from 'react'
import WidgetStore from '../store/WidgetStore'
import './Widget.css'
import HeaderCard from "./HeaderCard"
import reactCSS from 'reactcss'
import NETPIEMicrogear from '../store/Microgear'

class ImageCover extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      values: [[]],
      counter: 0
    }
  }
  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.deleteWidget(widgetId)
  }
  change = () => {
    this.setState({
        counter: this.state.counter+1
    });
  }
  componentWillMount () {
    setInterval(this.change, 7000)
    const count = this.props.payload.popups.length
    var tmp = this.state.values
    tmp.length = count
    //var tmp = Array.apply(null, Array(count)).map(function () {return 0})
    this.setState({
      values: tmp
    })
  }
  componentDidMount () {
    const payload = this.props.payload.popups
    payload.map((popup, x) => {
      popup.forms.map((value, y) => {
          let datasource = value.datasource
          if (NETPIEMicrogear.statusOnline[datasource]) {
            const microgear = NETPIEMicrogear.microgear[datasource]
            microgear.on('message', this.onMessage.bind(this,value,x,y))
          } else console.log('error : not Connect datasource !!')
          return 0
      })
      return 0
    })
  }
  onMessage = (payload,x,y,topic, msg) => {
    if (payload.value === topic) {
      let value = msg + ''
      if (payload.manual&&payload.manual!=='false') {
        try {eval(payload.jsValue)}
        catch (err){
          if(err!==null) value = msg + ''
        }
      }
      else value = value.split(payload.filter)[payload.filterIndex]
      var tmp = this.state.values
      if (!tmp[x]) tmp[x] = []
      tmp[x][y] = value
      this.setState({
        values: tmp
      })
    }
  }
  render() {
    const payload = this.props.payload
    const widgetId = this.props.widgetId
    var stylesObj = {}
    payload.popups.map( (popup,index) => {
      stylesObj['item'+index] = {
        left: popup.position[0],
        top: popup.position[1]
      }
      if (this.state.values[index]) {
        if (popup.shadowEff.index) {
          let eff = popup.shadowEff
          if (this.state.values[index][eff.index]) {
            let val = (this.state.values[index][eff.index])
            let mid = (eff.max - eff.min)/2
            let dif = val - mid
            let opacity = Math.abs(dif) * (1/mid)
            let color = ((255/(eff.max - eff.min)) * (val-eff.min)<0)?0:(255/(eff.max - eff.min)) * (val-eff.min)
            stylesObj['item'+index]['boxShadow'] = `5px 5px 5rem rgba(${color}, ${color}, ${color}, ${opacity})`
          }
        }
        if (popup.colorEff.index) {
          let eff = popup.colorEff
          if (this.state.values[index][eff.index]) {
            let val = this.state.values[index][eff.index]
            let rgbStart = [
              parseInt(eff.colorStart.substr(1, 2),16),
              parseInt(eff.colorStart.substr(3,2),16),
              parseInt(eff.colorStart.substr(5,2),16)
            ]
            let rgbEnd = [
              parseInt(eff.colorEnd.substr(1, 2),16),
              parseInt(eff.colorEnd.substr(3,2),16),
              parseInt(eff.colorEnd.substr(5,2),16)
            ]
            let range = eff.max - eff.min
            let rgbShade = [
              (rgbEnd[0]-rgbStart[0])/range,
              (rgbEnd[1]-rgbStart[1])/range,
              (rgbEnd[2]-rgbStart[2])/range
            ]
            let dif = val-eff.min
            let color = [
              parseInt(rgbStart[0]+(rgbShade[0]*dif),10),
              parseInt(rgbStart[1]+(rgbShade[1]*dif),10),
              parseInt(rgbStart[2]+(rgbShade[2]*dif),10)
            ]
            color.forEach((element,index) => {
              element = (element < 0)?0:(element > 255)?255:element
              element = element.toString(16)
              color[index] = (element.length < 2)?
                (element.length===0)?'00':'0' + element:element
            })
            stylesObj['item'+index]['background'] = `#${color[0]}${color[1]}${color[2]}`
          }
        }
      }

      return 0
    })
    var styles = reactCSS({
      'default': stylesObj
    })
    var popups = payload.popups.map((popup,index) => {
        let count = this.state.counter % popup.forms.length
        let popupValue = popup.forms[count]
        let popupData = 'Loading'
        if (this.state.values[index])
          if (this.state.values[index][count])
            popupData = this.state.values[index][count] + ' ' + popupValue.unit
        return <div className="item rounded-circle btn" key={index} style={styles[`item${index}`]}>
          <span>
            {(popupValue.icon)?<i className={popupValue.icon}></i>:null} <br/>
            {popupData}
          </span>
        </div>
      }
    )
    return (
        <div className="item-content ImageCover card shadowcard rounded-0 border-0 col-12 mb-3 h-100" data-id={widgetId}>
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body">
            <img src={payload.file} className="img-fluid" alt="base64"/>
            <div className='gridPopup'>
              {popups}
            </div>
          </div>
        </div>
    )
  }
}

export default ImageCover 