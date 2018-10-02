import React from 'react'
import WidgetStore from '../../store/WidgetStore'

class JsInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
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
      text: this.state.text
    }
    console.log(payload)
    WidgetStore.addWidgetToDB(this.props.machineId, payload)
    this.setState({
      title: 'Text',
      text: ''
    })
  }

  processScrirt () {

  }
  render() {
    const payload = this.state
    return (
      <div className="FormProgressBar container">
        <form>
          <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">Java sricpt</span>
            </div>
            <textarea class="form-control" aria-label="With textarea" name="text" onChange={this.handlePayload}></textarea>
          </div>
        </form>
        {}
      </div>
    )
  }
}

export default JsInput