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
        set: false,
    }
  }
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <PageMenu callback={this.clickSetting} value={this.state.set}/>
          <div id="content">
          
            <Hamburger/>
            <h1>HOME</h1>
            <Test set={this.state.set}/>
            
            {(this.state.set)?<Add/>:''}
          </div>
        </div>
      </div>
    )
  }
  clickSetting = (flag) => {
    this.setState({
      set: flag
    })
  }
}

export default App
