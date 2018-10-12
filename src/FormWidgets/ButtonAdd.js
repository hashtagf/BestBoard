import React from 'react'
import './ButtonAdd.css'
import CreateBoard from './CreateBoard'
import Store from '../store/Store'

class ButtonAdd extends React.Component {
  handleClick = () => {
    Store.editWidget = false
  }
  render() {

    return (
      <div className={(Store.currentId)?'ButtonAdd':'ButtonAdd d-none'}>
        <p id="ButtonAdd">
          <button type="button" className="btn btn-secondary p-0 shadow rounded-circle"
            data-toggle="modal" 
            data-target=".ModalCreate"
            onClick={this.handleClick}
          >
            <div className="circleMenu">+</div>
          </button>
        </p>
        <CreateBoard/>
        {/* {(this.state.showModal)?<CreateBoard showModal={this.handleClick}/>:''} */}
      </div>
    )
  }
}


export default ButtonAdd