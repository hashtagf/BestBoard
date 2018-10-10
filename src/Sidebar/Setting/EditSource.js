import React, { Component } from 'react'
//import './Settingmenu.css'
import FormNetpie from './FormNetpie'
import FormMqtt from './FormMqtt'
class EditSource extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'NETPIE' || this.props.values.datasource.typeDatasource
    }
  }
  handleChange = (e) => {
    this.setState({
      type: e.target.value
    })
  }
  render() {
    var props = this.props.values
    return (
      <div className={"modal fade edit ModalEditSource"} id="scrollbar-style" data-backdrop="true" tabIndex="-1" role="dialog" aria-hidden="false" >
        <div className="modal-dialog modal-lg">
          <div className="modal-content text-dark">
            <div className="modal-header">
              <h5 className="modal-title">{(props.datasource.name)?"Edit " + props.datasource.name:"New"} source </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <select className="form-control" id="type" onChange={this.handleChange} defaultValue={props.datasource.typeDatasource}>
                    <option value="NETPIE">Netpie Microgear</option>
                    <option value="localhostMongodb">Localhost MongoDB</option>
                  </select>
                </div>
                <FormSource type={this.state.type} values={props}/>
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
      case 'NETPIE': return <FormNetpie values={this.props.values}/>
      case 'localhostMongodb': return <FormMqtt values={this.props.values}/>
      default: return "please select"
    }
  }
}

export default EditSource
