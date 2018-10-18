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
      values: []
    }
  }
  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.deleteWidget(widgetId)
  }
  componentDidMount() {
    const popups = this.props.payload.popups
    popups.map( (popup,index) =>{
      var temp = this.state.values
      this.setState({
        values: temp.push('')
      })
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
    if (index > 0) {
      var popup = this.props.payload.popups[index]
      if (popup.value === topic) {
        let value = msg + ''
        if (popup.manual) eval(popup.jsValue)
        else value = value.split(popup.filter)[popup.filterIndex]
        const stateValue = this.state.value
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
      <div className="item" key={index} style={styles['item'+index]}>
        <div className="item-content rounded-circle">
          {this.state.values[index]}
        </div>
      </div>
    )
    return (
      <div className="item col-12 text-body mb-3" data-id={widgetId}>
        <div className="item-content ImageCover card shadowcard rounded-0 border-0">
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body">
            <img src={payload.file} className="img-fluid widgetImage" alt="base64"/>
            <div className='gridPopup'>
              {popups}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageCover 