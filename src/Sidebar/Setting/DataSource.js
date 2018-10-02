import React, { Component } from 'react'
//import './Settingmenu.scss'
class DataSource extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
          <li>
            <a>Datasource</a>
            <ul className="list-unstyled" >
              <li><a href="">Netpie</a></li>
              <li><a className="second"><i className="fas fa-plus-square"></i> new source</a></li>
            </ul>
          </li>
    )
  }
}

export default DataSource
