import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color';
import './ColorInput.css'
class ColorInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayColorPicker: false,
      color: '',
      background: '#0BB1EF',
      colors: ['#0BB1EF','#FFFFFF','#66666A','#323741','#06858C','#45C48B','#FFD039','#F47942']
    }
    //this.handleChange = this.handleChange.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      color: nextProps.color
    })
  }
  handleChange = (color, e) => {
    this.setState({
      color: color.hex
    })
    e = {
      target: {
        name: this.props.name,
        value: color.hex
      }
    } 
    this.props.handleChangeComplete(e)
  }
  handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    })
  }
  render() {
    var styles = reactCSS({
      'default': {
        color: {
          background: `${ this.props.color }`
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
        <div className="form-control" onClick={ this.handleClick} style={styles.color} >
          {this.props.color} <div className="color ml-2 btn"  />
        </div>
        <ColorPicker displayColorPicker={this.state.displayColorPicker} color={this.props.color} onChange={this.handleChange}/>
        
      </div>
    )
  }
}
class ColorPicker extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
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
  render () {
    if (this.props.displayColorPicker) {
      return (
        <div className="ColorPicker">
            <SketchPicker color={ this.props.color } onChange={ this.props.onChange }/>
        </div>
      )
    }
    else return ('')
    
  }
}

export default ColorInput