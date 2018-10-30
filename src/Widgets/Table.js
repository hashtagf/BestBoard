/* eslint no-eval: 0 */
import React from 'react'
import WidgetStore from '../store/WidgetStore'
import NETPIEMicrogear from '../store/Microgear'
import './Widget.css'
import HeaderCard from "./HeaderCard"

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colTitle: [],
      values: [],
      time: null,
      checkValue: []
    }
  }

  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.deleteWidget(widgetId)
  }

  componentDidMount() {
    const payload = this.props.payload
 
    payload.columns.forEach((col, index) => {
      if (NETPIEMicrogear.statusOnline[col.datasource]) {
        const microgear = NETPIEMicrogear.microgear[col.datasource]
        microgear.on('message', (topic, msg) => {
          let values = this.state.values
          let checkValue = this.state.checkValue
          if (col.value === topic) {
            let value = msg + ''
            let now = new Date()
            if (col.manual) eval(col.jsValue)
            else value = value.split(col.filter)[col.filterIndex]
            if (!this.state.checkValue[index]) {
              values[index] = [value]
              checkValue[index] = true
            } else values[index].push(value)

            this.setState({
              values: values,
              time: now
            })
          }
        })
      } else console.log('error : not Connect datasource !!')
    })
    
  }

  onMessage(topic, msg) {
    const payload = this.props.payload
    if (payload.value === topic) {
      let value = msg + ''
      let now = new Date()
      if (payload.manual) {
        try {eval(payload.jsValue)}
        catch (err){
          if(err!==null) value = msg + ''
        }
      }
      else value = value.split(payload.filter)[payload.filterIndex]
      this.setState({
        value: value,
        time: now
      })
    }
  } 

  render() {
    const payload = this.props.payload
    const values = this.state.values
    const widgetId = this.props.widgetId
    const cols = payload.columns.map((col, index) => 
      <th key={index}>
        {col.title}
      </th>  
    )
    // Logic sort Table
    let valRows = []
    let chkValRows = []
    values.map((value, index) => 
      value.map((val, i) => {
        if (!chkValRows[i]) {
          chkValRows[i] = true
          return valRows[i] = [val]
        } else return valRows[i].push(val)
      })
    )
    const rows = valRows.map((value, index) => 
      <tr key={index}>
        
        {value.map((val, i) => 
          <td key={i}>{val}</td>  
        )}
      </tr>
    )
    return (
        <div className="item-content Table card shadowcard rounded-0 widgetCard border-0 h-100 col-12" data-id={widgetId}>
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body text-center" id="scrollbar-style">
          <table className="table table-striped">
            <thead>
              <tr>
                {cols}
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
          </div>
        </div>
    )
  }
}

export default Table