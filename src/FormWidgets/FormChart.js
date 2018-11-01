import React from 'react'
import WidgetStore from '../store/WidgetStore'
import InputText from './Input/InputText'
import Store from '../store/Store'
import SummitBtn from './SummitBtn'
import FormMultiple from './Input/FormMultiple'

class FormChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Chart',
      feedID: '',
      feedAPI: '',
      values: [
        {value: ''}
      ],
      type: 'monotone',
      stroke: '#8884d8',
      fillOpacity: 1,
      fill: 'url(#color)',
      jsValue: '',
      manual: false
    }
    this.handlePayload = this.handlePayload.bind(this)
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
      });
    } else this.reState()
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
      });
    } else this.reState()
  }

  reState () {
    this.setState({
      title: 'Chart',
      feedID: '',
      feedAPI: '',
      values: [
        {value: ''}
      ],
      type: 'monotone',
      stroke: '#8884d8',
      fillOpacity: 1,
      fill: 'url(#color)',
      jsValue: '',
      manual: false
    })
  }
  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state.file)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const editWidget = this.props.editWidget
    let payload = {
      typeWidget: 'Chart',
      title: this.state.title,
      feedID: this.state.feedID,
      feedAPI: this.state.feedAPI,
      values: this.state.values,
      type: 'monotone',
      stroke: '#8884d8',
      fillOpacity: 1,
      fill: 'url(#color)',
      jsValue: this.state.jsValue,
      manual: this.state.jsValue,
      layout: {
        w: 6,
        h:6,
        minW: 6,
        minH: 6,
        maxW: 12,
        maxH: 100
      }
    }
    if (editWidget)  
      WidgetStore.updateWidget(editWidget.widgetId, payload)
    else 
      WidgetStore.createWidget(Store.currentId, payload)
    this.reState()
  }
  addPopup = (e) => {
    var tmp = this.state.values
    tmp.push({
      value: ''
    })
    this.setState({
      popups: tmp
    })
  }
  render() {
    const payload = this.state
    return (
      <div className="FormChart container">
        <InputText callback={this.handlePayload} title="Title" name="title" value={payload.title} />
        <InputText callback={this.handlePayload} title="Feed ID" name="feedID" value={payload.feedID} />
        <InputText callback={this.handlePayload} title="Feed API" name="feedAPI" value={payload.feedAPI} />
{/*         <InputText callback={this.handlePayload} title="Value" name="value" value={payload.values} placeholder="Value of Feed"/>
 */}    <FormMultiple
          payload={payload} 
          handlePayload={this.handlePayload} 
          title={'Values'}
          hideTitle={true}
          addBtnFunc={this.addPopup}
          forms={payload.values}
        >
          <InputText title="Value" name="value" placeholder="Value of Feed"/>
        </FormMultiple>
        <SummitBtn handleSubmit={this.handleSubmit} editWidget={this.props.editWidget}/>

      </div>
    )
  }
}

export default FormChart