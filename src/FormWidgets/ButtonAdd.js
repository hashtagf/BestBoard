import React from 'react'
import './ButtonAdd.css'
import CreateBoard from './CreateBoard'
import Store from '../store/Store'

class ButtonAdd extends React.Component {
  handleClick() {
    Store.editWidget = false
  }
  render() {
    return (
      <div className="ButtonAdd">
        <p id="ButtonAdd">
          <button type="button" className="btn btn-secondary p-0 shadow rounded-circle"
            data-toggle="modal" 
            data-target=".ModalCreate"
            onClick={this.handleClick}
          >
            <div className="circleMenu">+</div>
          </button>
        </p>
        <CreateBoard />
      </div>
    )
  }
}


export default ButtonAdd