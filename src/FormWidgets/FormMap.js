import React from 'react'
import WidgetStore from '../store/WidgetStore'
import InputText from './Input/InputText'
// import FormInputBasic from './Input/FormInputBasic'
import FormMultiple from './Input/FormMultiple'
import Store from '../store/Store'
import SummitBtn from './SummitBtn'
import './FormImageCover.css'
import FormInputBasic from './Input/FormInputBasic'

class FormMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Map',
      forms: [
        {
          title: 'point1',
          url: '',
          forms: [
            {
              title: 'Latitude',
              value: '',
              datasource: '',
              body: '',
              filter: ',',
              filterIndex: 0,
              jsValue: '',
              manual: false,
              required: true
            },
            {
              title: 'Longitude',
              value: '',
              datasource: '',
              body: '',
              filter: ',',
              filterIndex: 0,
              jsValue: '',
              manual: false,
              required: true
            }
          ]
        }
      ]
    }
    this.handlePayload = this.handlePayload.bind(this)
  }
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  componentDidMount() {
    let editWidget = this.props.editWidget
    if (editWidget) {
      Object.keys(editWidget).forEach((objectKey) => {
        if (objectKey !== 'widgetId') {
          return this.setState({
            [objectKey]: editWidget[objectKey]
          })
        }
      })
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
      title: 'Map',
      url: '',
      forms: [
        {
          title: 'point1',
          forms: [
            {
              title: 'Latitude',
              value: '',
              datasource: '',
              body: '',
              filter: ',',
              filterIndex: 0,
              jsValue: '',
              manual: false,
              required: true
            },
            {
              title: 'Longitude',
              value: '',
              datasource: '',
              body: '',
              filter: ',',
              filterIndex: 0,
              jsValue: '',
              manual: false,
              required: true
            }
          ]
        }
      ]
    })
  }
  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const editWidget = this.props.editWidget
    let payload = {
      typeWidget: 'Map',
      title: this.state.title,
      forms: this.state.forms,
      layout: {
        w: 3,
        h:8,
        minW: 3,
        minH: 8,
        maxW: 12,
        maxH: 30
      }
    }
    if (editWidget)
      WidgetStore.updateWidget(editWidget.widgetId, payload)
    else
      WidgetStore.createWidget(Store.currentId, payload)
    this.reState()
  }
  setPosition = ()=> {
    /* const forms = this.state.forms
    if (forms[0].value&&forms[1].value) {
      let value = msg + ''
      if (payload.manual) eval(payload.jsValue)
      else value = value.split(payload.filter)[payload.filterIndex]
      const stateValue = this.state.value
      this.setState({
        lat: value,
        lng: 0
      })
    } */
  }
  addPopup = (e) => {
    var tmp = this.state.forms
    tmp.push({       
      title: 'point1',
      url: '',
      forms: [
        {
          title: 'Latitude',
          value: '',
          datasource: '',
          body: '',
          filter: ',',
          filterIndex: 0,
          jsValue: '',
          manual: false,
          required: true
        },
        {
          title: 'Longitude',
          value: '',
          datasource: '',
          body: '',
          filter: ',',
          filterIndex: 0,
          jsValue: '',
          manual: false,
          required: true
        }
      ]
    })
    this.setState({
      forms: tmp,
    })
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
          <FormMultiple
            handlePayload={this.handlePayload}
            title={'Points'}
            addBtnFunc={this.addPopup}
            forms={payload.forms}>
            <InputText
            callback={this.handlePayload}
            title="Title"
            name="title"
            value={payload.title} />
            <InputText
            callback={this.handlePayload}
            title="URL"
            name="url"
            value={payload.url} />
            <FormMultiple
              title={'Position'} 
            >
              <FormInputBasic hiddenTitle={true}/>
            </FormMultiple>
          </FormMultiple>

        <SummitBtn handleSubmit={this.handleSubmit} editWidget={this.props.editWidget} />
      </div>
    )
  }
}


export default FormMap