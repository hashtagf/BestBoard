import React from 'react'
import WidgetStore from '../store/WidgetStore'
import InputText from './Input/InputText'
import Store from '../store/Store'
import SummitBtn from './SummitBtn'

class FormImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Image',
      file: null,
      jsValue: '',
      manual: false
    }
    this.handlePayload = this.handlePayload.bind(this)
    this.handleFile = this.handleFile.bind(this)
  }
  componentDidMount() {
    let editWidget = this.props.editWidget
    if (editWidget) {
      Object.keys(editWidget).forEach((objectKey) => {
        if (objectKey !== 'widgetId') {
          return this.setState({
            [objectKey]: editWidget[objectKey]
          })
        }
      });
    } 
    else this.reState()
  }

  componentWillReceiveProps(nextProps){
    let editWidget = nextProps.editWidget
    if (editWidget) {
      Object.keys(editWidget).forEach((objectKey) => {
        if (objectKey !== 'widgetId') {
          return this.setState({
            [objectKey]: editWidget[objectKey]
          })
        }
      })
    } else this.reState()
  }

  reState () {
    this.setState({
      title: 'Image',
      file: null
    })
  }
  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFile(e) {
    if (e.target.files && e.target.files[0]) {

      var FR = new FileReader()
      FR.onloadend = () => {
        this.setState({
          file: FR.result
        })
      }
      FR.readAsDataURL(e.target.files[0])
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const editWidget = this.props.editWidget
    let payload = {
      typeWidget: 'Image',
      title: this.state.title,
      file: this.state.file,
      jsValue: this.state.jsValue,
      manual: this.state.manual,
      layout: {
        w: 3,
        h:6,
        minW: 3,
        minH: 5,
        maxW: 12,
        maxH: 50
      }
    }
    if (editWidget)  
      WidgetStore.updateWidget(editWidget.widgetId, payload)
    else 
      WidgetStore.createWidget(Store.currentId, payload)
    this.reState()
  }
  render() {
    const payload = this.state
    return (
      <div className="FormProgressBar container">
        <InputText
          callback={this.handlePayload}
          title="Title"
          name="title"
          value={payload.title} />
        <div className="form-group row">
          <label htmlFor="file" className="col-3 col-form-label">
            File :
            </label>
          <div className="col-9">
            <div className="input-group">
              <div className="custom-file">
                <input id="uploadImg"
                  aria-describedby="uploadImg"
                  name="path"
                  type="file"
                  className="custom-file-input"
                  onChange={this.handleFile}
                />
                <label className="custom-file-label" htmlFor="uploadImg">Choose file</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-2 text-center">
          <div className="col-12">
            {
              (payload.file)?
              <img src={payload.file} className="img-thumbnail" id="b64" height={250} alt="" />
            :null}
          </div>
        </div>
        <SummitBtn handleSubmit={this.handleSubmit} editWidget={this.props.editWidget}/>

      </div>
    )
  }
}

export default FormImage