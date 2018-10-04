import React from 'react'

class FormInputBasic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.callback(e)
  }

  render() {
    const handleChange = this.props.callback
    let values = this.props.values

    return (
      <div>
        <div className="form-group row">
          <label htmlFor="title" className="col-3 col-form-label">
            Title :
            </label>
          <div className="col-9">
            <input
              name="title"
              type="text"
              className="form-control"
              value={values.title}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="datasource" className="col-3 col-form-label">
            Datasource :
          </label>
          <div className="col-9">
            <select className="custom-select" name="datasource" onBlur={handleChange}>
              {values.listDatasources}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="value" className="col-3 col-form-label">
            Value :
          </label>
          <div className="col-9">
            <input
              name="value"
              type="text"
              className="form-control"
              value={values.value}
              onChange={handleChange}
              placeholder="Topic :: /room/temp"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default FormInputBasic