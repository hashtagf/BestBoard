import React from 'react'
import WidgetStore from '../store/WidgetStore'
import FormInputBasic from './Input/FormInputBasic'
import InputText from './Input/InputText'
import Store from '../store/Store'

class FormList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'List',
      value: '',
      text: '',
      unit: '',
      icon: '',
      datasource: '',
      filter: '',
      filterIndex: 0
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
      typeWidget: 'List',
      title: this.state.title,
      value: this.state.value,
      text: this.state.text,
      unit: this.state.unit,
      icon: this.state.icon,
      datasource: this.state.datasource,
      filter: this.state.filter,
      filterIndex: this.state.filterIndex
    }
    WidgetStore.createWidget(Store.currentId, payload)
    this.setState({
      title: 'Text',
      value: '',
      text: '',
      unit: '',
      icon: '',
      datasource: '',
      filter: '',
      filterIndex: 0
    })
  }
  render() {
    const payload = this.state
    return (
      <div className="FormList container">
        <form>
          <FormInputBasic callback={this.handlePayload} values={payload} />
          <InputText callback={this.handlePayload} title="Icon" name="icon" value={payload.icon} />
          <InputText callback={this.handlePayload} title="Text" name="text" value={payload.text} />
          <InputText callback={this.handlePayload} title="Unit" name="unit" value={payload.unit} />
          <div className="form-group row">
            <label htmlFor="exampleList" className="col-3 col-form-label">
              Example List :
          </label>
            <div className="col-9 text-secondary">
              {this.state.text + ' <Value> ' + this.state.unit}
            </div>
          </div>
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

export default FormList