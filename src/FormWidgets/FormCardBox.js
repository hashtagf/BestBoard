import React from 'react'
import WidgetStore from '../store/WidgetStore'
import Store from '../store/Store'
import FormInputBasic from './Input/FormInputBasic'
import InputText from './Input/InputText'
import SummitBtn from './SummitBtn'
import fontAwesomeIcons from './fontawesomeIcons.json'
import Creatable from 'react-select/lib/Creatable'

class FormCardBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Card Box',
      value: '',
      datasource: '',
      body: '',
      filter: ',',
      filterIndex: 0,
      unit: '',
      icon: '',
      jsValue: '',
      manual: false,
    }
    this.handlePayload = this.handlePayload.bind(this)
  }
  // Start Widget
  componentDidMount() {
    let editWidget = this.props.editWidget
    if (editWidget) {
      Object.keys(editWidget).forEach((objectKey) => {
        if (objectKey !== 'widgetId') {
          this.setState({
            [objectKey]: editWidget[objectKey]
          })
        }
      })
    } else this.reState()
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
      });
    } else this.reState()
  }

  reState () {
    this.setState({
      title: 'Card Box',
      datasource: '',       
      body: '',
      value: '',
      filter: ',',
      filterIndex: 0,
      unit: '',
      icon: '',
      jsValue: '',
      manual: false
    })
  }
  // End Update
  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    const editWidget = this.props.editWidget
    e.preventDefault()
    let payload = {
      typeWidget: 'CardBox',
      title: this.state.title,
      value: this.state.value,
      body: this.state.body,
      datasource: this.state.datasource,
      filter: this.state.filter,
      filterIndex: this.state.filterIndex,
      unit: this.state.unit,
      icon: this.state.icon,
      jsValue: this.state.jsValue,
      manual: this.state.manual,
      layout: {
        w: 3,
        h:6,
        minW: 3,
        minH: 5,
        maxW: 12,
        maxH: 6
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
      <div className="FormCardBox container">
        <FormInputBasic callback={this.handlePayload} values={payload} />
        <InputText callback={this.handlePayload} title="Unit" name="unit" value={payload.unit} />
        {/* <InputText callback={this.handlePayload} title="Icon" name="icon" value={payload.icon} placeholder="fontAwesome Icon (name Icon) :: tint"/> */}
        <Icons value={payload} callback={this.handlePayload}/>
        <SummitBtn handleSubmit={this.handleSubmit} editWidget={this.props.editWidget}/>

      </div>
    )
  }
}

class Icons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      icons: [],
      selectOption: {}
    }
  }

  componentWillReceiveProps(nextProps){
    let icons = []
    fontAwesomeIcons.icons.map((icon) => 
      icons.push({
        label: icon.split(' ')[1] ,
        value: icon
      })
    )
    this.setState({
      icons: icons,
      selectOption: {
        label: nextProps.value.icon,
        value: nextProps.value.icon
      }
    })
  }

  handleSelected = (selectOption) => {
    this.setState({ selectOption })
    this.props.value.icon = selectOption.value
  }

  render () {
    let {icons, selectOption} = this.state
    if(selectOption === null) selectOption = ''
    return (
      <div className="form-group row">
        <label htmlFor="value" className="col-3 col-form-label">
          Select Icon :
        </label>
        <div className="col-7">
          <Creatable
            value={selectOption}
            onChange={this.handleSelected}
            options={icons}
            placeholder='Topic :: Name icons'
          />
        </div>
        <div className="col-2">
          <i className={'fa-2x ' + selectOption.value}></i>
          {/* {(selectOption.value)?<i className={'fa-2x ' + selectOption.value}></i>:<i className="fa-2x fas fa-spinner fa-pulse"></i>} */}
        </div>
      </div>
    )
  }
}

export default FormCardBox