import React, { Component } from 'react'
import './Settingmenu.css'
import DataSource from './DataSource.js'
import ColorSetting from './ColorSetting.js'
class Settingmenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colorId: this.props.colorId,
    }
  }

  render() {
    const mode = this.props.mode
    return (
      <div className={(mode)? 'false': 'd-none'}>
        <ul className="list-unstyled components">
          <DataSource/>
        </ul>
        <ul className="list-unstyled components">
          <ColorSetting colorId={this.props.colorId}/>
        </ul>
        
      </div>
    )
  }
}

export default Settingmenu
