import React, { Component } from 'react'
//import mobx from './store/test'
import './App.css'
import ButtonAdd from './FormWidgets/ButtonAdd'
import PageMenu from './Sidebar/Sidebar'
import Hamburger from './Sidebar/Hamburger'
import Routing from './routes'
import Store from './store/Store'
class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
        mode: false,
        colorId: 0
    }
  }
  render() {
    const mode = this.state.mode
    //document.documentElement.style.setProperty("--themeBG", "#000000");
    return (
      <div className="App">
        <div className="wrapper">
          <PageMenu callback={this.clickSetting} mode={mode} colorId={this.state.colorId}/>
          <div id="content">
            <Hamburger/>
            <h1>BestBoard Framework</h1>
            <Routing />
            {(mode)?<ButtonAdd/>:''}
          </div>
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
