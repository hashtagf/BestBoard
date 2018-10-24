import React from 'react'
import WidgetStore from '../store/WidgetStore'
import InputText from './Input/InputText'
import Store from '../store/Store'
import SummitBtn from './SummitBtn'

class FormHtml extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'HTML',
      body: ''
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
    }
    else this.reState()
  }
  reState() {
    this.setState({
      title: 'HTML',
      body: ''
    })
  }
  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const editWidget = this.props.editWidget
    let payload = {
      typeWidget: 'HTML',
      title: this.state.title,
      body: this.state.body,
      layout: {
        w: 3,
        h: 6,
        minW: 3,
        minH: 5,
        maxW: 12,
        maxH: 6
      }
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
      <div className="FormHtml container">
        <InputText
          callback={this.handlePayload}
          title="Title"
          name="title"
          value={payload.title} />
        <div className="form-group">
          <label htmlFor="body">Tag HTML or Javascript</label>
          <textarea name="body" className="form-control" value={payload.body} id="body" rows="15" onChange={this.handlePayload}></textarea>
        </div>
        <SummitBtn handleSubmit={this.handleSubmit} editWidget={this.props.editWidget} />

      </div>
    )
  }
}

export default FormHtml