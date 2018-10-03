import React, { Component } from 'react'
import './Main.css'
import { Redirect } from 'react-router-dom'
import Store from '../store/Store'

class Main extends Component {
  render() {
    return (
      <Redirect to={'/' + Store.currentId} />
    )
  }
}

export default Main
