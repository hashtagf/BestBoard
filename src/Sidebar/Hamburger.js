import React, { Component } from 'react'
import './Hamburger.css'

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

          </div>
        </nav>
      </div>
    )
  }
}

export default Hamburger