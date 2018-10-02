import React, { Component } from 'react'
import './Main.css'
var Muuri = require('muuri')
var grid = null

class Main extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      widgets: []
    }
  }

  componentDidMount() {
    console.log(this.props.match.params.boardId)
    //const {prop1name, prop2Name} = this.props;
    grid = new Muuri('.grid', {
      dragEnabled: true,
      dragContainer: document.body,
      itemClass: 'col-md-3',
      dragStartPredicate: (item, event) => {
        return this.props.mode
      },
      dragSort: function () {
        return [grid]
      }
    })
    grid.on('move', (data) => {
      console.log('ok')
    })

  }

  componentWillUnmount () {
    console.log('UnMount')
    grid = null
    this.setState({
      widgets: []
    })
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
            One
          </div>
        </div>
      </div>
    )
  }
}

export default Main
