import React from 'react'
import reactCSS from 'reactcss'
import { Twitter } from 'react-color';
import './ColorInput.css'
class ColorInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayColorPicker: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
      background: '#0BB1EF',
      colors: ['#0BB1EF','#FFFFFF','#66666A','#323741','#06858C','#45C48B','#FFD039','#F47942']
    }
    //this.handleChange = this.handleChange.bind(this)
  }
  handleChangeComplete = (color,e) => {
    console.log(e)
    //this.props.handleChangeComplete(color,e)
  }
  handleChange = (color, e) => {

  }
  handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    })
  }
  render() {
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        }
      }
    })
    return (
      <div>
        <div className="form-control" onClick={ this.handleClick }>
          <div className="" styles={styles.color} />
        </div>
        <div className="ColorPicker">
          {(this.state.displayColorPicker)?
            <Twitter
              name={this.props.name}
              color={this.state.background}
              colors= {this.state.colors}
              onChangeComplete={this.handleChangeComplete}
            />
            :''
          }
        </div>

      </div>
    )
  }
}

export default ColorInput