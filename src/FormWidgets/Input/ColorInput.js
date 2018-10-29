import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color';
import ClickOutside from 'react-click-outside';
import './ColorInput.css'
class ColorInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayColorPicker: false,
      color: '',
      colors: ['#0BB1EF','#FFFFFF','#66666A','#323741','##374452','#45C48B','#FFD039','#F47942']
    }
    //this.handleChange = this.handleChange.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      color: nextProps.color
    })
  }
  handleAuto = (e) => {
    this.setState({
      color: 'auto'
    })
    e = {
      target: {
        name: this.props.name,
        value: 'auto'
      }
    }
    this.props.handleChangeComplete(e)

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
      displayColorPicker: true
    })
  }
  handleClose = () => {
    this.setState({
      displayColorPicker: false
    })
  }
  render() {
    var styles = reactCSS({
      'default': {
        color: {
          background: `${ (this.props.color !== 'auto')?this.props.color:'#f3f3f3' }`
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
      <div className="form-group row inputcolor">
        <label htmlFor="unit" className="col-3 col-form-label text-capitalize">
          {this.props.title} :
        </label>
        <div className="col-9">
        <div className="form-check">
          <input className="form-check-input" 
            type="checkbox" 
            name="colorAuto"
            onClick={this.handleAuto}
            id="exampleRadios1" value="auto" checked={(this.props.color==='auto')?true:false}/>
          <label className="form-check-label" htmlFor="exampleRadios1">
            Auto
          </label>
        </div>
          <div className="form-control" onClick={ this.handleClick} style={styles.color} >
            {(this.props.color!=='auto')?this.props.color:'auto'} <div className="color ml-2"/>
          </div>
          <ClickOutside onClickOutside={this.handleClose}>
            <ColorPicker displayColorPicker={this.state.displayColorPicker} color={this.props.color} onChange={this.handleChange}/>
          </ClickOutside>
        </div>
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