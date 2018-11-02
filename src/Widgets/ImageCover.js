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
      stylesObj['item-position'+index] = {
        left: popup.position[0],
        top: popup.position[1]
      }
      if (popup.shadowEff.index) {
        let eff = popup.shadowEff
        let val = (this.state.values[index][eff.index])
        let mid = (eff.max - eff.min)/2
        let dif = val - mid
        let opacity = Math.abs(dif) * (1/mid)
        let color = ((255/(eff.max - eff.min)) * (val-eff.min)<0)?0:(255/(eff.max - eff.min)) * (val-eff.min)
        stylesObj['item-shadow'+index] = {
        boxShadow: `1rem 2rem 2rem rgba(${color}, ${color}, ${color}, ${opacity})`
        }
      }
      if (popup.colorEff.index) {
        let eff = popup.colorEff
        let val = this.state.values[index][eff.index]
        let start = parseInt(eff.colorStart.substr(1),16)
        let stop = parseInt(eff.colorEnd.substr(1),16)
        if (stop < start) start = [stop, stop = start][0];
        let shade = (stop - start)/(eff.max - eff.min);
        let color = parseInt((start+shade*(val-eff.min))).toString(16)
        stylesObj['item-color'+index] = {
          background: `#${color}`
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
        let styleAr = [`item-position${index}`]
        if (popup.shadowEff.index) styleAr.push(`item-shadow${index}`)
        return <div className="item rounded-circle btn" key={index} style={styles[styleAr]}>
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