import React from 'react'
import WidgetStore from '../store/WidgetStore'
import Store from '../store/Store'
import FormInputBasic from './Input/FormInputBasic'
import InputText from './Input/InputText'
class FormCardBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Card Box',
      value: '',
      datasource: '',
      filter:'',
      filterIndex: 0,
      unit: '',
      icon: '',
      status: true
    }
    this.handlePayload = this.handlePayload.bind(this)
  }

  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(e.target.name, e.target.value)
  }

  handleSubmit(e) {
    e.preventDefault()
    let payload = {
      typeWidget: 'CardBox',
      title: this.state.title,
      value: this.state.value,
      datasource: this.state.datasource,
      filter: this.state.filter,
      filterIndex: this.state.filterIndex,
      unit: this.state.unit,
      icon: this.state.icon
    }
    console.log(payload)
    WidgetStore.createWidget(Store.currentId, payload)
    this.setState({
      title: 'Card Box',
      datasource: '',
      value: '',
      filter: '/',
      filterIndex: 0,
      unit: '',
      icon: ''
    })
  }

  render() {
    return (
      <div className="FormCardBox container">
        <FormInputBasic callback={this.handlePayload} values={this.state} />
        <InputText callback={this.handlePayload} title="Unit" name="unit" value={this.state.unit} />
        <InputText callback={this.handlePayload} title="Icon" name="icon" value={this.state.icon} />
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


export default FormCardBox