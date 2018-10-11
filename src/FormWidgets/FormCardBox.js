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
      body: '',
      filter: ',',
      filterIndex: 0,
      unit: '',
      icon: '',
      status: true
    }
    this.handlePayload = this.handlePayload.bind(this)
  }
  // Start Widget
  componentWillReceiveProps(nextProps) {
    let editWidget = nextProps.editWidget
    if (editWidget) {
      this.setState({
        title: editWidget.title,
        value: editWidget.value,
        datasource: editWidget.datasource,
        filter: editWidget.filter,
        filterIndex: editWidget.filterIndex,
        unit: editWidget.unit,
        icon: editWidget.icon,
        status: editWidget.status
      })
    } else
      this.setState({
        title: 'Card Box',
        datasource: '',       
        body: '',
        value: '',
        filter: ',',
        filterIndex: 0,
        unit: '',
        icon: ''
      })
  }
  // End Update
  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(e.target.name, e.target.value)
  }

  handleSubmit(e) {
    const editWidget = this.props.editWidget
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
    if (editWidget)  
      WidgetStore.updateWidget(editWidget.widgetId, payload)
    else 
      WidgetStore.createWidget(Store.currentId, payload)

    this.setState({
      title: 'Card Box',
      datasource: '',       
      body: '',
      value: '',
      filter: ',',
      filterIndex: 0,
      unit: '',
      icon: ''
    })
  }

  render() {
    const payload = this.state
    return (
      <div className="FormCardBox container">
        <FormInputBasic callback={this.handlePayload} values={payload} />
        <InputText callback={this.handlePayload} title="Unit" name="unit" value={payload.unit} />
        <InputText callback={this.handlePayload} title="Icon" name="icon" value={payload.icon} />
        <div className="row justify-content-end">
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit"
              className="btn btn-primary border-0"
              onClick={this.handleSubmit.bind(this)}
              data-dismiss="modal" aria-label="Close"
            ><i className="fas fa-plus-square"></i>{(this.props.editWidget) ? ' Save Widget' : ' Add widget'}</button>
          </div>
        </div>
      </div>
    )
  }
}


export default FormCardBox