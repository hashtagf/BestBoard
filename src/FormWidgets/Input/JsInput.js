/* eslint no-eval: 0 */
import React from 'react'

class JsInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: this.props.value,
      error: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    let codeStr = e.target.value
    let error = null

    try {
      eval(codeStr)
    }
    catch (err) {
      error = err
      console.log(err)
    }
    this.setState({
      code: codeStr,
      error: error
    })
    if(error!==null) codeStr = ''
    e.target.value = codeStr
    this.props.callback(e)
  }

  render() {
    const name = this.props.name
    return (
      <div>
        <input type="text" 
          className={(this.state.error===null)?'form-control is-valid':'form-control is-invalid'} 
          id={name} 
          name={name}
          value={this.state.code}
          placeholder="Enter Javascript" onChange={this.handleChange}/>
      </div>
    )
  }
}

export default JsInput