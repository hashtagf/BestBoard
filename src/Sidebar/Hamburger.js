import React, { Component } from 'react'
import './Hamburger.css'
import Store from '../store/Store'
import { observer } from 'mobx-react'

@observer
class Hamburger extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid pl-0">
            <div className="navbar-header">
              <button type="button" id="sidebarCollapse" className="navbar-btn">
                <span></span>
                <span></span>
                <span></span>
              </button>
              
            </div>
            <div className="navbar-brand my-auto text-truncate"><strong>{Store.pageName}</strong></div>
            <div><i className="fas fa-bell"></i></div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Hamburger