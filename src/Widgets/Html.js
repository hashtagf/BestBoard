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
      html: '',
      datasources : []
    }
  }

  componentDidMount() {
    this.initHtml()
  }

  initHtml = () => {
    
    let body = this.state.body
    console.log(body)
    let datasources = this.state.datasources
      let start_cut = body.indexOf('<script>')
      let start_body = body.substr(0,start_cut)
      let body_cut = body.substr(start_cut + 8)
      body = body.substr(body_cut)
      console.log(start_body)
      let end_cut = body.indexOf('</script>')
      if (end_cut === -1) this.setState({html: body}) 
      end_cut = body.indexOf('</script>')
      body = body.substr(end_cut, 9)
    
    
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
        initHtml += body
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