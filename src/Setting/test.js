import React, { Component } from 'react'
import './test.css'
var Muuri = require('muuri')
class test extends Component {
    componentDidMount() {
        //const {prop1name, prop2Name} = this.props;
        var grid = new Muuri('.grid', {
            dragEnabled: true,
            dragContainer: document.body,
            dragSort: function () {
              return [grid]
            }
        });
        grid.on('move', (data) => {
            console.log('ok');
        });
    }
  render() {
    return (
        <div className="grid">

        <div className="item">
          <div className="item-content">
            One
          </div>
        </div>
        <div className="item">
          <div className="item-content">
            Two
          </div>
        </div>
      </div>
    )
  }
}

export default test
