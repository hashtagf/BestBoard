/* eslint no-eval: 0 */

import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Widget.css'
import './Led.css'
import HeaderCard from "./HeaderCard"

class Led extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: false
    }
  }

  componentDidMount() {
    const payload = this.props.payload
    if (NETPIEMicrogear.statusOnline[payload.datasource]) {
      const microgear = NETPIEMicrogear.microgear[payload.datasource]
      microgear.on('message', this.onMessage.bind(this))
    } else console.log('error : not Connect datasource !!')
  }
  processJs = () => {

  }
  onMessage(topic, msg) {
    const payload = this.props.payload
    
    if (payload.value === topic) {
      let value = msg + ''
      let valueCondition = payload.valueON + ''
      if (payload.manual) {
        try {eval(payload.jsValue)}
        catch (err){
          if(err!==null) value = msg+''
        }
      }
      else value = value.split(payload.filter)[payload.filterIndex] + ''
      let flag = false
      switch (payload.expressionON) {
        case '=':flag = value === valueCondition
          break
        case '≠':flag = value !== valueCondition
          break
        case '>':flag = value > valueCondition
          break
        case '<':flag = value < valueCondition
          break
        case '>=':flag = value >= valueCondition
          break
        case '<=':flag = value <= valueCondition
          break
        default : break
      }
      this.setState({
        value: flag,
      })
    }
  }

  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.deleteWidget(widgetId)
  }

  render() {
    const payload = this.props.payload
    const widgetId = this.props.widgetId
    return (
        <div className="item-content card shadowcard rounded-0 border-0 col-12 h-100" data-id={widgetId}>
          <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body ">
            {(this.state.value)?<span className="led on"></span>:<span className="led off"></span>}
          </div>
        </div>
    )
  }
}

export default Led 
