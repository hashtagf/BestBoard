import React from 'react'
import './WidgetsList.css'
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
        }
      ],
      selectType: 0
    }
  }

  selectWidget(e) {
    this.setState({
      selectType: e.target.name
    })
  }

  componentWillUnMount() {
    this.setState({
      selectType: 0
    })
  }

  render() {
    // const boardId = this.props.match.params.boardId
    let listWidget = this.state.widgets.map((widget, index) => {
      var tmp =
        <div key={index} className={(this.state.selectType === widget.name) ? 'listwid border border-2 border-primary p-1' : 'listwid p-1'}>
          <img className="img-thumbnail"
            src={widget.img}
            name={widget.name}
            alt=""
            onClick={this.selectWidget.bind(this)}
          />
          <figcaption className="figure-caption text-center">{widget.name}</figcaption>

        </div>
      return tmp
    })
    return (
      <div className="row">
        <div className="col-sm-3 col-12 border-right listWidgets " data-spy="scroll" id="scrollbar-style">
          <p><strong>Widget</strong></p>
          {listWidget}
        </div>
        <div className="col-sm-9 col-12">
          <strong>Form</strong>
          <SelectType selectType={this.state.selectType} />
        </div>
      </div>
    )
  }
}

class SelectType extends React.Component {
  render() {
    const { selectType } = this.props
    switch (selectType) {
      case 'CardBox':
        return <FormCardBox />
      case 'Gauge':
        return <FormGauge />
      case 'GaugeSpeed':
        return <FormGaugeSpeed />
      case 'Image':
        return <FormImage />
      case 'ProgressBar':
        return <FormProgressBar />
      case 'Progress':
        return <FormProgress />
      case 'Text':
        return <FormText />
      case 'List':
        return <FormList />
      case 'Chart':
        return <FormChart />
      case 'Button':
        return <FormButton />
      default:
        return <h1>Please select widget</h1>
    }
  }
}

export default WidgetsList
