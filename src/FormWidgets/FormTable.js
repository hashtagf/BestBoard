import React from 'react'
import WidgetStore from '../store/WidgetStore'
import Store from '../store/Store'
import FormInputBasic from './Input/FormInputBasic'
import InputText from './Input/InputText'
import SummitBtn from './SummitBtn'
import FormMultiple from './Input/FormMultiple'

class FormText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Table',
      columns: [
        {
          title: 'time',
          type: 'time',
          time: '',
          url: ''
        }
      ],
    }
    this.handlePayload = this.handlePayload.bind(this)
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
      })
    } else this.reState()
  }

  reState () {
    this.setState({
      title: 'Table',
      columns: [
        {
          title: 'time',
          type: 'time',
          time: '',
          url: ''
        }
      ]
    })
  }
  handlePayload(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    const editWidget = this.props.editWidget
    let payload = {
      typeWidget: 'Table',
      title: this.state.title,
      columns: this.state.columns,
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

  addColumn = () => {
    let columns = this.state.columns
    columns.push({
      title: 'Column ' + columns.length,
      datasource: '',
      value: '',
      filter: ',',
      filterIndex: 0,
      manual: false,
      jsValue: '',
      type: 'data',
      unit: ''
    })
    this.setState({
      columns: columns,
    })
  }

  render() {
    const payload = this.state
    return (
      <div className="FormProgressBar container">
        <InputText callback={this.handlePayload} title="Table" name="title" value={payload.title} />
        {
          (payload.columns)?        

            <FormMultiple
            handlePayload={this.handlePayload} 
            title={'Columns'}
            addBtnFunc={this.addColumn}
            forms={payload.columns}>
              <FormInputBasic/>
              <InputText title="Unit" name="unit" placeholder="unit"/>
            </FormMultiple>
            :null
        }        
        <SummitBtn handleSubmit={this.handleSubmit} editWidget={this.props.editWidget}/>
      </div>
    )
  }
}

export default FormText