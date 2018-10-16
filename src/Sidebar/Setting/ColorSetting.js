import React, { Component } from 'react'
import axios from 'axios'
import { observer } from 'mobx-react'

@observer
class ColorSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colorName: this.props.Store.colorName,
    }
  }

  handleClick = (name) => {
    axios.put(this.props.Store.server + '/board/' + this.props.Store.currentId, { colorName: name })
    this.props.Store.setColor(name)
    this.setState({
      colorName: name
    })
  }

  render() {
    return (
        <li>
          <a> Color </a>
          <ul className="list-inline" > {this.props.Store.colorSet.map((colors, i) => (
            <li className="list-inline-item" key={i}
              onClick={this.handleClick.bind(this, colors.name)} >
              <div className={(this.state.colorName === colors.name) ? 'rounded-circle coloroption border-active' : 'rounded-circle coloroption'}
                id={'colorset-' + (i + 1)} >
              </div>
            </li>
          ))}
          </ul>
        </li>
    )
  }
}

export default ColorSetting