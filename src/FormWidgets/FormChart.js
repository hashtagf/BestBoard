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
      value: 0,
      type: 'monotone',
      stroke: '#8884d8',
      fillOpacity: 1,
      fill: 'url(#color)',
    }
    this.handlePayload = this.handlePayload.bind(this)
  }

  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state.file)
  }

  handleSubmit(e) {
    e.preventDefault()
    let payload = {
      typeWidget: 'Chart',
      title: this.state.title,
      feedID: this.state.feedID,
      feedAPI: this.state.feedAPI,
      value: this.state.value,
      type: 'monotone',
      stroke: '#8884d8',
      fillOpacity: 1,
      fill: 'url(#color)',
    }
    WidgetStore.createWidget(Store.currentId, payload)
    this.setState({
      title: 'Chart',
      feedID: '',
      feedAPI: '',
      value: 0,
      type: 'monotone',
      stroke: '#8884d8',
      fillOpacity: 1,
      fill: 'url(#color)',
    })
  }
  render() {
    const payload = this.state
    return (
      <div className="FormChart container">
        <form >
          <InputText callback={this.handlePayload} title="Title" name="title" value={payload.title} />
          <InputText callback={this.handlePayload} title="Feed ID" name="feedID" value={payload.feedID} />
          <InputText callback={this.handlePayload} title="Feed API" name="feedAPI" value={payload.feedAPI} />
          <InputText callback={this.handlePayload} title="Value" name="value" value={payload.value} />
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
        </form>
      </div>
    )
  }
}

export default FormChart