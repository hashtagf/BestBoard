import React from 'react'
import WidgetStore from '../store/WidgetStore'
import './Widget.css'
import HeaderCard from './HeaderCard'
import InnerHTML from 'dangerously-set-inner-html'
import DatasourceStore from '../store/DatasourceStore'
import NETPIEMicrogear from '../store/Microgear'


class HTML extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      body: props.payload.body,
      datasources : []
    }
  }

  componentDidMount() {
    this.initHtml()
  }

  initHtml = () => {
    
    let body = this.state.body
    let datasources = this.state.datasources
    let start_body = body
    let scriptBody = ''
    let start_cut = body.indexOf('<script>')
    if (start_cut !== -1 ){
      start_body = body.substr(0,start_cut)
      let body_cut = body.substr(start_cut + 8)
      let end_cut = body_cut.indexOf('</script>')
      scriptBody = body_cut.substr(0, end_cut)
    }
    DatasourceStore.datasources.forEach((datasource, index) => {
      NETPIEMicrogear.microgear[datasource._id].on('message', (topic, msg) => {
        let initHtml = ''
        datasources.push({
          topic : topic,
          msg: msg + ''
        })
        initHtml += start_body
        initHtml += '<script>'
        initHtml += `var datasource = [];`
        datasources.map((val) => 
          initHtml += `datasource['` + val.topic + `'] = '` + val.msg + `';`
        )
        initHtml += scriptBody
        initHtml += '</script>'
        // console.log(initHtml)
        this.setState({
          body: initHtml,
          datasources : datasources
        })
      })
    }) 
  }

  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.deleteWidget(widgetId)
  }

  render() {
    const payload = this.props.payload
    const widgetId = this.props.widgetId
    const { body } = this.state
    // console.log(html)
    return (
      <div className="shadowcard item-content card rounded-0 widgetCard col-12 h-100 border-0" data-id={widgetId}>
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId} />
        <div className="card-body ">
          <InnerHTML html={ body } />
        </div>
      </div>
    )
  }
}

export default HTML