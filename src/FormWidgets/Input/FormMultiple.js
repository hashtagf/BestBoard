import React from 'react'
import FormTime from './FormTime'

// import reactCSS from 'reactcss'
// const $ = require("jquery")


class FormMultiple extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectForm: 0
    }
  }
  static defaultProps = {
    hiddenIcon: true,
    hiddenTitle: true
  };
  handleClick = (e) => {
    if (e.target.value) 
      this.setState({
        selectForm: parseInt(e.target.value, 10)
      })
      if (this.props.selectIndex) 
        this.props.selectIndex(parseInt(e.target.value, 10))
      
  }
  handlePayload = (e) => {
    var tmp = this.props.forms
    var index = parseInt(this.state.selectForm, 10)
    tmp[index][e.target.name] = e.target.value
    var obj = {
      target: {
        name: 'forms',
        value: tmp
      }
    }
    this.props.handlePayload(obj)
  }
  deleteForm (index) {
    //var index =0
    var forms = this.props.forms
    forms.splice(index, 1)
    var obj = {
      target: {
        name: 'forms',
        value: forms
      }
    }
    //(index - 1 >= 0)?index-1:null
    this.setState({
      selectForm: forms.length - 1
    })
    if (this.props.selectIndex) 
      this.props.selectIndex(forms.length - 1)
    this.props.handlePayload(obj)
  }
  addBtnFunc = (e) => {
    //console.log(e)
    this.setState({
      selectForm: this.props.forms.length
    })
    if (this.props.selectIndex) 
      this.props.selectIndex(this.props.forms.length)
    this.props.addBtnFunc(e)
  }

  render() {
    const selectForm = this.state.selectForm
    const formsbtn = []
    var buttons = this.props.forms.map((form, index) => {
      formsbtn.push((form.title)?form.title:index+1)
      return <button key={index}
        className={(selectForm === index) ? 'btn btn-primary' : 'btn'}
        type="button" name="selectForm"
        value={index} data-toggle="collapse"
        data-target={"#form" + index}
        aria-expanded={(selectForm === index) ? "true" : "false"}
        aria-controls={"form" + index} onClick={this.handleClick}>
        {(form.title)?form.title:index+1}
        {(selectForm === index && !form.required)?<i className="fas fa-minus-square editbtn del ml-3" onClick={() => this.deleteForm(index)} key={index}></i>:null}
      </button>}
    )
    if (this.props.addBtnFunc) {
      let addBtn = <button className="btn"
        type='button'
        onClick={this.addBtnFunc}>
          <i className="fas fa-plus-square"></i>
        </button>
      buttons.push(addBtn)
    }
    var forms = this.props.forms.map((form, index) =>
      <div key={index} id={"#form" + index}
        className={(selectForm === index) ? 'collapse show' : 'collapse'}
        aria-labelledby="headingOne"
        data-parent="#popupForm">
          {React.Children.map(this.props.children,(child,index) => {
              if (form.type === 'time'&&index===0)
                return <FormTime values={form} callback={this.handlePayload}/>
              if (form.type !== 'time') {
                if (child.type.name === 'InputText') 
                  return React.cloneElement(child, {value: form[child.props.name],callback:this.handlePayload})
                else if (child.type.name === 'FormMultiple')
                  return React.cloneElement(child, {forms: form.forms,handlePayload:this.handlePayload})
                else return React.cloneElement(child, {values: form,callback:this.handlePayload})
              }
            }
          )}
      </div>
    )
    return (
      <div className="accordion" id="popupForm">
        {
          (formsbtn) ?
            <div className="form-group row">
              <label htmlFor="value" className="col-3 col-form-label">
                {this.props.title} :
                </label>
              <div className="col-9">
                <div className="btn-group" role="group" aria-label="Basic example" id="scrollbar-style">
                  {buttons}
                </div>
              </div>
            </div>
            : null

        }

        <strong>Value : {formsbtn[this.state.selectForm]}</strong>
        {forms}
      </div>
    )
  }
}

export default FormMultiple