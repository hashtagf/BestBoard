import React, { Component } from 'react'
import './App.css'
import Test from './Setting/test'
import Add from './Setting/Add'
import PageMenu from './Setting/PageMenu'
import Hamburger from './Setting/Hamburger'
//var $ = require("jquery");
//import Muuri from 'muuri'

class App extends Component {
  render() {

    return (
      <div className="App">
        <PageMenu/>
        <div id="content">
          <Hamburger/>
          <h1>HOME</h1>
          <Test/>
          <Add/>
        </div>
      </div>
    )
  }
}

export default App
