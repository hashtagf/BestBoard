import React from 'react'
import Store from '../store/Store'

class HeaderCard extends React.Component {
  handleEdit (payload,e) {
    const widgetId = this.props.widgetId
    payload['widgetId'] = widgetId
    Store.editWidget = payload
  }
  render() {
    return (
      <div className="card-header border-0 d-flex bd-highlight py-0 pr-1">
          <div className="mr-auto p-2 bd-highlight card-title mb-0">
            <p className="text-justify mb-0">{this.props.title}</p>
          </div>
          
          <div className="bd-highlight p-1 settingwid" id={(Store.mode)?'settingMode':'displayMode'}>
            <a data-toggle="modal" data-target=".ModalCreate" onClick={this.handleEdit.bind(this,this.props.payload)}>
              <i className="fas fa-cog mr-3"></i>
            </a>
            <a onClick={this.props.del} ><i className="fas fa-trash-alt text-danger"></i></a>
          </div>
      </div>
    )
  }
}

export default HeaderCard