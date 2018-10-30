import React from 'react'


// import reactCSS from 'reactcss'
// const $ = require("jquery")


class FormMultiple extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectForm: '0'
    }
  }
  static defaultProps = {
    hiddenIcon: true,
    hiddenTitle: true
  };
  handleClick = (e) => {
    this.setState({
      selectForm: e.target.value
    })
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
    console.log(tmp, index)
    this.props.handlePayload(obj)
  }
  hideTitle = (e) => {

  }
  render() {
    const selectForm = this.state.selectForm
    const formsbtn = []
    var buttons = this.props.forms.map((form, index) =>{
      formsbtn.push((form.title)?form.title:index+1)
      return <button key={index}
        className={(selectForm === index + '') ? 'btn btn-primary' : 'btn'}
        type="button" name="selectForm"
        value={index} data-toggle="collapse"
        data-target={"#form" + index}
        aria-expanded={(selectForm === index + '') ? "true" : "false"}
        aria-controls={"form" + index} onClick={this.handleClick}>
        {(form.title)?form.title:index+1}
      </button>}
    )
    if (this.props.addBtnFunc) {
      let addBtn = <button className="btn" onClick={this.props.addBtnFunc}><i className="fas fa-plus-square"></i></button>
      buttons.push(addBtn)
    }
    var forms = this.props.forms.map((form, index) =>
      <div key={index} id={"#form" + index}
        className={(selectForm === index + '') ? 'collapse show' : 'collapse'}
        aria-labelledby="headingOne"
        data-parent="#popupForm">
          {React.Children.map(this.props.children,child => {
              if (child.type.name === 'InputText') 
                return React.cloneElement(child, {value: form[child.props.name],callback:this.handlePayload})
              else if (child.type.name === 'FormMultiple')
                return React.cloneElement(child, {forms: form,handlePayload:this.handlePayload})
              else return React.cloneElement(child, {values: form,callback:this.handlePayload})
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
                <div className="btn-group" role="group" aria-label="Basic example">
                  {buttons}
                </div>
              </div>
            </div>
            : null

        }

        <strong className="text-center">Value : {formsbtn[this.state.selectForm]}</strong>
        {forms}
      </div>
    )
  }
}

export default FormMultiple