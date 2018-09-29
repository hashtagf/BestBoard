import React, { Component } from 'react'
import './App.css'
import Test from './Setting/test'
import Add from './Setting/Add'
import PageMenu from './Setting/PageMenu'
import Hamburger from './Setting/Hamburger'
//var $ = require("jquery");
//import Muuri from 'muuri'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
        mode: false,
        pages: ['page 1']
    }
  }
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <PageMenu callback={this.clickSetting} mode={this.state.mode}/>
          <div id="content">
          
            <Hamburger/>
            <h1>HOME</h1>
            <Test mode={this.state.mode}/>
            
            {(this.state.mode)?<Add/>:''}
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
