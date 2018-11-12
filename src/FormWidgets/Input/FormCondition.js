import React from 'react'

class FormCondition extends React.Component {
  render () {
    let props = this.props
    return (
      <div className="form-row form-group">
        <label htmlFor="inputCity col-2 col-form-label">Condition {props.title} :</label>
        <div className="col-3">
          <select id="inputState" className="form-control"
            value={props.values['expression' + props.event]} 
            name={'expression' + props.event} 
            onChange={props.callback}>
            {(props.event === 'OFF')?<option value="else">else</option>:null}
            <option value="="> = </option>
            <option value="≠"> ≠ </option>
            <option value=">"> {'>'} </option>
            <option value="<"> {'<'} </option>
            <option value=">="> >= </option>
            <option value="<="> {'<='} </option>
          </select>
        </div>
        <div className="col">
          <input type="text" className="form-control" 
            value={props.values.valueON} 
            name={'value' + props.event} 
            placeholder="Static value" 
            onChange={props.callback}/>
        </div>
      </div>
    )
  }
}
export default FormCondition