import React, { Component } from 'react'
import './App.css'
import ButtonAdd from './FormWidgets/ButtonAdd'
import Sidebar from './Sidebar/Sidebar'
import Hamburger from './Sidebar/Hamburger'
import Routing from './routes'
import Store from './store/Store'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: Store.mode,
      colorId: 0
    }
  }
  render() {
    const mode = this.state.mode
    return (
      <div className="App">
        <div className="wrapper">
          <Sidebar clickSetting={this.clickSetting} colorId={this.state.colorId} />
          <div className="content" id="scrollbar-style">
            <Hamburger />
            <Routing />
          </div>
          {(mode) ? <ButtonAdd /> : ''}
        </div>
        
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
