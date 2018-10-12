import React from 'react'
import FormCardBox from './FormCardBox'
import FormGauge from './FormGauge'
import FormGaugeSpeed from './FormGaugeSpeed'
import FormImage from './FormImage'
import FormProgress from './FormProgress'
import FormProgressBar from './FormProgressBar'
import FormText from './FormText'
import FormList from './FormList'
import FormChart from './FormChart'
import FormButton from './FormButton'
import FormToggle from './FormToggle'
import { observer } from 'mobx-react'

@observer
class EditWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectType: "CardBox"
    }
  }
  selectWidget = (e) => {
    this.setState({
      selectType: e.target.name
    })
  }
  componentWillReceiveProps(nextProps) {
    let editWidget = nextProps.editWidget
    if (editWidget.typeWidget) {
      this.setState({
        selectType: editWidget.typeWidget
      })
    }
  }
  render() {
    let editWidget = this.props.editWidget
    return (
      <div className="row">
        {(editWidget.typeWidget) ? '' : <WidgetsList selectWidget={this.selectWidget} />}
        <div className={(editWidget.typeWidget)?"col-12 formWidget":"col-sm-9 col-12 formWidget"} id="scrollbar-style">
          <strong>Form</strong>
          <form>
            <SelectType selectType={this.state.selectType} editWidget={editWidget} />
          </form>
        </div>
      </div>
    )
  }
}

class WidgetsList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      widgets: [
        {
          name: "CardBox",
          img: "https://i.stack.imgur.com/k7Nit.png"
        },
        {
          name: "Gauge",
          img: "https://i.stack.imgur.com/k7Nit.png"
        },
        {
          name: "ProgressBar",
          img: "https://image.opencart.com/cache/583c1e869b365-resize-710x380.jpg"
        },
        {
          name: "Progress",
          img: "https://www.excel-easy.com/examples/images/line-chart/line-chart.png"
        },
        {
          name: "GaugeSpeed",
          img: "https://i.stack.imgur.com/k7Nit.png"
        },
        {
          name: "Image",
          img: "https://i.stack.imgur.com/k7Nit.png"
        },
        {
          name: "Chart",
          img: "https://image.opencart.com/cache/583c1e869b365-resize-710x380.jpg"
        },
        {
          name: "List",
          img: "https://www.excel-easy.com/examples/images/line-chart/line-chart.png"
        },
        {
          name: "Text",
          img: "https://www.excel-easy.com/examples/images/line-chart/line-chart.png"
        },
        {
          name: "Button",
          img: "https://www.excel-easy.com/examples/images/line-chart/line-chart.png"
        },
        {
          name: "Toggle",
          img: "https://i.stack.imgur.com/k7Nit.png"
        },
      ],
      selectType: "CardBox"
    }
  }
  selectWidget = (e) => {
    this.setState({
      selectType: e.target.name
    })
    this.props.selectWidget(e)
  }
  render() {
    // const boardId = this.props.match.params.boardId
    let listWidget = this.state.widgets.map((widget, index) => {
      var tmp =
        <div key={index} className={(this.state.selectType === widget.name) ? 'listwid active rounded p-2' : 'listwid rounded p-2'}>
          <img className="img-thumbnail border-0"
            src={widget.img}
            name={widget.name}
            alt=""
            onClick={this.selectWidget}
          />
          <figcaption className="figure-caption text-center">{widget.name}</figcaption>
        </div>
      return tmp
    })
    return (
      <div className="col-sm-3 col-12 border-right listWidgets " data-spy="scroll" id="scrollbar-style">
        <p><strong>Widget</strong></p>
        {listWidget}
      </div>
    )
  }
}

class SelectType extends React.Component {
  render() {
    let editWidget = this.props.editWidget
    const { selectType } = this.props
    switch (selectType) {
      case 'CardBox':
        return <FormCardBox editWidget={editWidget} />
      case 'Gauge':
        return <FormGauge editWidget={editWidget} />
      case 'GaugeSpeed':
        return <FormGaugeSpeed editWidget={editWidget} />
      case 'Image':
        return <FormImage editWidget={editWidget} />
      case 'ProgressBar':
        return <FormProgressBar editWidget={editWidget} />
      case 'Progress':
        return <FormProgress editWidget={editWidget} />
      case 'Text':
        return <FormText editWidget={editWidget} />
      case 'List':
        return <FormList editWidget={editWidget} />
      case 'Chart':
        return <FormChart editWidget={editWidget} />
      case 'Button':
        return <FormButton editWidget={editWidget} />
      case 'Toggle':
        return <FormToggle editWidget={editWidget} />
      default:
        return <h1>Please select widget</h1>
    }
  }
}

export default EditWidget
