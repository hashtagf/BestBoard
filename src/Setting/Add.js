import React, { Component } from 'react'
import './Add.css'
class Add extends Component {
    componentDidMount() {
        const circle = document.querySelector('.circleMenu');
        const menu = document.querySelector('.menu');
        //Funkcja
        circle.addEventListener('click' , function(){
          console.log('Menu');
          circle.classList.toggle('circleAnimate');
          menu.classList.toggle('menuKoniec');
        })
    }
  render() {
    return (
        <div>
            <div className="circleMenu">+</div>
            <div className="menu">
                
            </div>
        </div>
    )
  }
}

export default Add
