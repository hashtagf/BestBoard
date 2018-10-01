import React, { Component } from 'react'
import './App.css'
import './App.scss'
import Test from './Setting/test'
//import Add from './Setting/Add'
import PageMenu from './Setting/PageMenu'
import Hamburger from './Setting/Hamburger'
//var $ = require("jquery");
//import Muuri from 'muuri'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
        mode: false,
        pages: [{name:'page 1'}],
        colorId: 0
    }
  }
  render() {
    //document.documentElement.style.setProperty("--themeBG", "#000000");
    return (
      <div className="App">
        <div className="wrapper">
          <PageMenu callback={this.clickSetting} mode={this.state.mode} colorId={this.state.colorId}/>
          <div id="content">
          
            <Hamburger/>
            <h1>HOME</h1>
            <Test mode={this.state.mode}/>
            
            {(this.state.mode)?'<Add/>':''}
          </div>
        </div>
      </div>
    )
  }
  clickSetting = (flag) => {
    this.setState({
      mode: flag
    })
  }
}

export default App
