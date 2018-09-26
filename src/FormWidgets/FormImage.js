import React from 'react'
import WidgetStore from '../../store/WidgetStore'

class FormImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Image',
      file: 'empty',
      machineId: this.props.machineId
    }
    this.handlePayload = this.handlePayload.bind(this)
    this.handleFile = this.handleFile.bind(this)
  }

  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state.file)
  }
  
  handleFile(e) {
    if (e.target.files && e.target.files[0]) {

      var FR = new FileReader()
      FR.onloadend = function () {
        document.getElementById("b64").src = FR.result
      }
      FR.readAsDataURL(e.target.files[0])
      console.log(FR)
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    let payload = {
      typeWidget: 'Image',
      title: this.state.title,
      file: document.getElementById("b64").src
    }
    console.log(payload)
    WidgetStore.addWidgetToDB(this.props.machineId, payload)
    this.setState({
      title: 'Image',
      file: 'empty'
    })
    document.getElementById('b64').src = ''
  }
  render() {
    const payload = this.state
    return (
      <div className="FormProgressBar container">
        <form >
          <div className="form-group row">
            <label htmlFor="title" className="col-3 col-form-label">
              Title :
          </label>
            <div className="col-9">
              <input
                name="title"
                type="text"
                className="form-control"
                value={payload.title}
                onChange={this.handlePayload}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="file" className="col-3 col-form-label">
              File :
          </label>
            <div className="col-9">
              <input id="uploadImg"
                name="path"
                type="file"
                className="form-control-file"
                onChange={this.handleFile}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <img src="" id="b64" height={250} alt=""/>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="col-3">
              <button type="submit"
                className="btn btn-secondary btn-block"
                onClick={this.handleSubmit.bind(this)}
                data-dismiss="modal" aria-label="Close"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default FormImage