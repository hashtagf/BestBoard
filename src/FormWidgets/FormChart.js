import React from 'react'
import WidgetStore from '../store/WidgetStore'
import InputText from './Input/InputText'
import Store from '../store/Store'

class FormChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Chart',
      feedID: '',
      feedAPI: '',
      value: '',
      type: 'monotone',
      stroke: '#8884d8',
      fillOpacity: 1,
      fill: 'url(#color)'
    }
    this.handlePayload = this.handlePayload.bind(this)
  }
  componentWillReceiveProps(nextProps) {
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
      value: '',
      type: 'monotone',
      stroke: '#8884d8',
      fillOpacity: 1,
      fill: 'url(#color)'
    })
  }
  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state.file)
  }

  handleSubmit(e) {
    e.preventDefault()
    const editWidget = this.props.editWidget
    let payload = {
      typeWidget: 'Chart',
      title: this.state.title,
      feedID: this.state.feedID,
      feedAPI: this.state.feedAPI,
      value: this.state.value,
      type: 'monotone',
      stroke: '#8884d8',
      fillOpacity: 1,
      fill: 'url(#color)'
    }
    if (editWidget)  
      WidgetStore.updateWidget(editWidget.widgetId, payload)
    else 
      WidgetStore.createWidget(Store.currentId, payload)
    this.reState()
  }
  render() {
    const payload = this.state
    return (
      <div className="FormChart container">
        <InputText callback={this.handlePayload} title="Title" name="title" value={payload.title} />
        <InputText callback={this.handlePayload} title="Feed ID" name="feedID" value={payload.feedID} />
        <InputText callback={this.handlePayload} title="Feed API" name="feedAPI" value={payload.feedAPI} />
        <InputText callback={this.handlePayload} title="Value" name="value" value={payload.value} placeholder="Value of Feed"/>
        <div className="row justify-content-end">
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button"
              className="btn btn-primary border-0"
              onClick={this.handleSubmit.bind(this)}
              data-dismiss="modal" aria-label="Close"
            ><i className="fas fa-plus-square"></i> Add widget</button>
          </div>
        </div>
      </div>
    )
  }
}

export default FormChart