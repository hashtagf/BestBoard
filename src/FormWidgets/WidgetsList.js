import React from 'react'
import FormCardBox from './FormCardBox'
import FormGauge from './FormGauge'
import './WidgetsList.css'
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
          name: "progress",
          img: "https://image.opencart.com/cache/583c1e869b365-resize-710x380.jpg"
        },
        {
          name: "graph",
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
        <div className="col-3 border-right listWidgets " data-spy="scroll" id="scrollbar-style">
          {listWidget}
        </div>
        <div className="col-9">
          <SelectType selectType={this.state.selectType} />
        </div>
      </div>
    )
  }
}

class SelectType extends React.Component {
  render() {
    const {selectType} = this.props
    switch (selectType) {
      case 'CardBox':
        return <FormCardBox />
      case 'Gauge' : 
        return <FormGauge />
      default:
        return <h1>Please select widget</h1>
    }
  }
}

export default WidgetsList
