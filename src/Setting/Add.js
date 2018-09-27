import React, { Component } from 'react'
import './Add.css'
class Add extends Component {
    componentDidMount() {

        //Funkcja
        /* circle.addEventListener('click' , function(){
          console.log('Menu');
          circle.classList.toggle('circleAnimate');
          menu.classList.toggle('menuKoniec');
        }) */
    }
  render() {
    return (
        <div>
            <div className="circleMenu"  data-toggle="modal" data-target="#exampleModal">+</div>
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
                
        </div>
    )
  }
}

export default Add
