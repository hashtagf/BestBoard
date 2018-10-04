import React, { Component } from 'react'
//import './Settingmenu.css'
import FormNetpie from './FormNetpie'
import FormMqtt from './FormMqtt'
class CreateSource extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'netpie'
    }
  }
  handleChange (e) {
    this.setState({
      type: e.target.value
    })
  }
  render() {
    return (
      <div className="modal fade ModalCreateSource" data-backdrop="true" tabIndex="-1" role="dialog" aria-hidden="false" >
        <div className="modal-dialog modal-lg">
          <div className="modal-content text-dark">
            <div className="modal-header">
              <h5 className="modal-title">Create new source</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <select className="form-control" id="type" onChange={this.handleChange.bind(this)}>
                    <option value="netpie">Netpie Microgear</option>
                    <option value="mqtt">MQTT</option>
                  </select>
                </div>
                <FormSource type={this.state.type}/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
class FormSource extends Component {
  render () {
    switch (this.props.type) {
      case 'netpie': return <FormNetpie/>
      case 'mqtt': return <FormMqtt/>
      default: return "please select"
    }
  }
}

export default CreateSource
