import React from 'react'
import Store from '../store/Store'

class HeaderCard extends React.Component {

  render() {
    return (
      <div className="card-header border-0 d-flex bd-highlight">
          <div className="mr-auto p-2 bd-highlight">
            <h5 className="text-truncate">{this.props.title}</h5>
          </div>
          <div className="bd-highlight p-2 settingwid" id={(Store.mode)?'settingMode':'displayMode'}>
            <a data-toggle="modal" data-target=".ModalCreate"><i className="fas fa-cog mr-3"></i></a>
            <a className="" onClick={this.props.del} ><i className="fas fa-trash-alt text-danger"></i></a>
          </div>
      </div>
    )
  }
}

export default HeaderCard