import React from 'react'

import './ButtonAdd.css'
import CreateBoard from './CreateBoard'

class ButtonAdd extends React.Component {
  render() {
    return (
      <div className="ButtonAdd">
        <p id="ButtonAdd">
          <button type="button" className="btn btn-secondary p-0 shadow rounded-circle"
            data-toggle="modal" data-target=".ModalCreate" >
            <div className="circleMenu">+</div>
          </button>
        </p>
        <CreateBoard />
      </div>
    )
  }
}


export default ButtonAdd