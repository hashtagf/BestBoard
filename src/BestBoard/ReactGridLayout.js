import React from "react"
import { WidthProvider, Responsive } from "react-grid-layout"
import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
import './Main.css'
import LocalStore from '../store/LocalStore'
import Store from '../store/Store'
import socketIOClient from 'socket.io-client'
import axios from 'axios'
import WidgetStore from '../store/WidgetStore'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactResizeDetector from 'react-resize-detector'

const socket = socketIOClient(Store.server)
const ResponsiveGridLayout = WidthProvider(Responsive)
const originalLayouts = getFromLS("layouts") || {}

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      listWidgets: [],
      connect: true,
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    }
  }
  componentDidMount() {
    if (this.state.connect) this.response()
    else this.loadLocal()
  }
  loadLocal = () => {
    this.setState({
      listWidgets: LocalStore.local.widgets
    })
    WidgetStore.showWidgets(LocalStore.local.widgets[Store.currentId])
  }

  response = () => {
    this.getWidgets()
    socket.on('update-widget', (msg) => {
      if (msg !== 'update-index') {
        this.getWidgets()
      }
    })
  }

  getWidgets() {
    axios.get(Store.server + '/widget/' + Store.currentId).then((res) => {
      let tmp = WidgetStore.showWidgets(res.data)
      this.setState({
        listWidgets: tmp,
        widgets: res.data
      })
    })
  }

  onResize = () => {
    this.setState({
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    })
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts)
    this.setState({ layouts })
  }

  render() {
    const { listWidgets, layouts } = this.state

    let widgets = listWidgets.map((widget, index, array) =>
      <div key={widget.key}
        data-grid={{
          x: index,
          y: 0,
          w: widget.props.payload.layout.w,
          h: widget.props.payload.layout.h,
          minW: widget.props.payload.layout.minW,
          minH: widget.props.payload.layout.minH,
          // autoSize: true
        }}>
        {widget}
      </div>
    )
    // function calculateWH(widthPx, heightPx, colWidth, rowHeight, margin) {
    //   let w = Math.ceil((widthPx - margin[0]) / (colWidth + margin[0]));
    //   let h = Math.ceil((heightPx - margin[1]) / (rowHeight + margin[1]));
    //   return [w, h];
    // };
    console.log(layouts)
    return (
      <div className="board">
        <ReactResizeDetector handleWidth skipOnMount refreshRate={10} onResize={this.onResize} />
        <ReactCSSTransitionGroup
          transitionName="layouts"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
          <ResponsiveGridLayout className="layouts"
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
            cols={{ lg: 12, md: 10, sm: 8, xs: 6 }}
            layouts={layouts}
            rowHeight={25}
            isDraggable={Store.mode}
            isResizable={Store.mode}
            onLayoutChange={(layout, layouts) =>
              this.onLayoutChange(layout, layouts)
            }>
            {widgets}
          </ResponsiveGridLayout>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default Main

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  console.log(key,value)
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}