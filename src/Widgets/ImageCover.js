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
      values: [0,0,0]
    }
  }
  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.deleteWidget(widgetId)
  }
  componentWillMount () {
    const count = this.props.payload.popups.length
    var tmp = Array.apply(null, Array(count)).map(function () {})
    this.setState({
      values: tmp
    })
  }
  componentDidMount () {
    const popups = this.props.payload.popups
    popups.map((popup,index) =>{
      if (NETPIEMicrogear.statusOnline[popup.datasource]) {
        const microgear = NETPIEMicrogear.microgear[popup.datasource]
        microgear.on('message', this.onMessage)
      } else console.log('error : not Connect datasource !!')
      return 0
    })

  }
  onMessage = (topic, msg) => {
    var popups = this.props.payload.popups
    var index = popups.findIndex(function(popup) {
      return popup.value === topic;
    });
    if (index >= 0) {
      console.log(index)
      var popup = this.props.payload.popups[index]
      if (popup.value === topic) {
        let value = msg + ''
        if (popup.manual) eval(popup.jsValue)
        else value = value.split(popup.filter)[popup.filterIndex]
        const stateValue = this.state.values
        stateValue[index] = value
        this.setState({
          values: stateValue,
        })
      }
    }

  }
  render() {
    const payload = this.props.payload
    const widgetId = this.props.widgetId
    var stylesObj = {}
    payload.popups.map( (popup,index) =>
      stylesObj['item'+index] = {
        left: popup.position[0],
        top: popup.position[1]
      }
    )
    var styles = reactCSS({
      'default': stylesObj
    })
    var popups = payload.popups.map((popup,index) =>
      <div className="item rounded-circle btn" key={index} style={styles['item'+index]}>
        {(popup.icon)?<span><i className={popup.icon}></i><br/></span>:null}
        {(this.state.values[index])?this.state.values[index]:'Loading'}{payload.unit}
      </div>
    )
    console.log(this.state.values)
    return (
        <div className="item-content ImageCover card shadowcard rounded-0 border-0  col-12 mb-3 h-100" data-id={widgetId}>
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body">
            <img src={payload.file} className="img-fluid widgetImage" alt="base64"/>
            <div className='gridPopup'>
              {popups}
            </div>
          </div>
        </div>
    )
  }
}

export default ImageCover 