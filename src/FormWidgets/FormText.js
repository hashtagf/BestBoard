import React from 'react'
import WidgetStore from '../store/WidgetStore'
import Store from '../store/Store'
import FormInputBasic from './Input/FormInputBasic'
import InputText from './Input/InputText'

class FormText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Text',
      value: '',
      datasource: '',       
      body: '',
      filter: ',',
      filterIndex: 0,
      startText: '',
      endText: ''
    }
    this.handlePayload = this.handlePayload.bind(this)
  }

  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    let payload = {
      typeWidget: 'Text',
      title: this.state.title,
      value: this.state.value,
      datasource: this.state.datasource,
      filter: this.state.filter,
      filterIndex: this.state.filterIndex,
      startText: this.state.startText,
      endText: this.state.endText
    }
    WidgetStore.createWidget(Store.currentId, payload)
    this.setState({
      title: 'Text',
      value: '',
      datasource: '',       
      body: '',
      filter: ',',
      filterIndex: 0,
      startText: '',
      endText: ''
    })
  }
  render() {
    const payload = this.state
    return (
      <div className="FormProgressBar container">
        <FormInputBasic callback={this.handlePayload} values={payload} />
        <InputText callback={this.handlePayload} title="Start Text" name="startText" value={payload.startText} />
        <InputText callback={this.handlePayload} title="End Text" name="startText" value={payload.endText} />
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

export default FormText