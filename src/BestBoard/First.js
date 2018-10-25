import React, { Component } from 'react'
import './Main.css'
import LocalStore from '../store/LocalStore'
import Logo from './logo.png'

import Store from '../store/Store'
import socketIOClient from 'socket.io-client'

const socket = socketIOClient(Store.server)

class First extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }

  render() {
    console.log(this.state.grid)
    return (
      <div className="first text-center">
        <img src={Logo} alt="" className="logo"/>
      </div>
    )
  }
}

export default First