import React from 'react'
import FormInputBasic from './FormInputBasic'
// import reactCSS from 'reactcss'
// const $ = require("jquery")

//(payload.file&&payload.popups)?<FormPopups payload={payload} handlePayload={this.handlePayload}/>:null

class FormMulti extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectForm: '0'
    }
  }
  handleClick = (e) => {
    this.setState({
      selectForm: e.target.value
    })
  }
  handlePayload = (e) => {
    var tmp = this.props.forms
    var index = parseInt(this.state.selectForm, 10)
    console.log(tmp,index)
    tmp[index][e.target.name] = e.target.value
    var obj = {
      target: {
        name: 'forms',
        value: tmp
      }
    }
    //this.props.handlePayload(obj)
  }
  render() {
    const payload = this.props.payload
    const selectForm = this.state.selectForm
    var buttons = this.props.formsbtn.map((popup, index) =>
      <button key={index}
        className={(selectForm === index + '') ? 'btn btn-primary' : 'btn'}
        type="button" name="selectForm"
        value={index} data-toggle="collapse"
        data-target={"#form" + index}
        aria-expanded={(selectForm === index + '') ? "true" : "false"}
        aria-controls={"form" + index} onClick={this.handleClick}>
        {popup}
      </button>
    );
    var forms = this.props.forms.map((form, index) =>
      <div key={index} id={"#form" + index}
        className={(selectForm === index + '') ? 'collapse show' : 'collapse'} 
        aria-labelledby="headingOne"
        data-parent="#popupForm">
        <FormInputBasic callback={this.handlePayload} values={form}/>
      </div>
    );
    return (
      <div className="accordion" id="popupForm">
        <div className="form-group row">
          <label htmlFor="value" className="col-3 col-form-label">
            {this.props.title} :
              </label>
          <div className="col-9">
            <div className="btn-group" role="group" aria-label="Basic example">
              {buttons}
            </div>
          </div>
        </div>
        {forms}
      </div>
    )
  }
}

export default FormMulti