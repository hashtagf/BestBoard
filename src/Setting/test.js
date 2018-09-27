import React, { Component } from 'react'
import './test.css'
var Muuri = require('muuri')
var grid = null
class test extends Component {

  componentDidMount() {
    //const {prop1name, prop2Name} = this.props;
    grid = new Muuri('.grid', {
      dragEnabled: true,
      dragContainer: document.body,
      itemClass: 'col-4',
      dragStartPredicate: (item,event) => {
        return this.props.set
      },
      dragSort: function () {
        return [grid]
      }
    })
    grid.on('move', (data) => {
      console.log('ok');
    })

  }
  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    /* grid = new Muuri('.grid', {
      dragEnabled: nextProps.set,
      dragContainer: document.body,
      itemClass: 'col-4',
      dragSort: function () {
        return [grid]
      }
    }) */
  }

  render() {
    return (

      <div className='grid'>
        <div className="item my-2">
          <div className="item-content">
            One
          </div>
        </div>
        <div className="item my-2">
          <div className="item-content">
            Two
          </div>
        </div>
        <div className="item my-2">
          <div className="item-content">
            Two
          </div>
        </div>
        <div className="item my-2">
          <div className="item-content">
            Two
          </div>
        </div>
        <div className="item my-2">
          <div className="item-content">
            Two
          </div>
        </div>
        <div className="item my-2">
          <div className="item-content">
            Two
          </div>
        </div>
        <div className="item my-2">
          <div className="item-content">
            Two
          </div>
        </div>
      </div>
    )
  }
}

export default test
