import React from 'react'

class InputText extends React.Component {
  render() {
    const handleChange = this.props.callback
    let value = this.props.value
    let name = this.props.name
    let placeholder = this.props.placeholder
    return (
      <div>
        <div className="form-group row">
          <label htmlFor="unit" className="col-3 col-form-label text-capitalize">
            {this.props.title} :
          </label>
          <div className="col-9">
            <input
              name={name}
              type="text"
              className="form-control"
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              readOnly={this.props.readOnly}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default InputText