import React, { Component } from 'react'
import './App.css'
import ButtonAdd from './FormWidgets/ButtonAdd'
import Sidebar from './Sidebar/Sidebar'
import Hamburger from './Sidebar/Hamburger'
import CreateSource from './Sidebar/Setting/CreateSource'

import Routing from './routes'
import Store from './store/Store'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: false,
      colorId: 0
    }
  }
  render() {
    const mode = this.state.mode
    return (
      <div className="App">
        <div className="wrapper">
          <Sidebar callback={this.clickSetting} mode={mode} colorId={this.state.colorId} />
          <div id="content">
            <Hamburger />
            <Routing />
            
          </div>
          
        </div>
        {(mode) ? <ButtonAdd /> : ''}
        <CreateSource />
      </div>
    )
  }
  clickSetting = (flag) => {
    this.setState({
      mode: flag
    })
    Store.mode = flag
  }
}

export default App
