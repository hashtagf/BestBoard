import React from "react"
import { WidthProvider, Responsive } from "react-grid-layout"
//import '../../node_modules/react-grid-layout/css/styles.css'
//import '../../node_modules/react-resizable/css/styles.css'
import './Main.css'
import Store from '../store/Store'
import socketIOClient from 'socket.io-client'
import axios from 'axios'
import WidgetStore from '../store/WidgetStore'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactResizeDetector from 'react-resize-detector'
import Skeleton from 'react-skeleton-loader'

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
  componentWillMount () {
    Store.currentId = this.props.location.pathname.split('/')[1]
  }
  componentDidMount() {
    if (this.state.connect) this.response()
  }

  response = () => {
    this.getWidgets()
    socket.on('update-widget', (msg) => {
      if (msg !== 'update-index') {
        this.getWidgets()
      }
    })
    socket.on('error', function(exception) {
      console.log('SOCKET ERROR', exception)
      socket.destroy()
    })
  }

  getWidgets() {
    axios.get(Store.server + '/widget/board/' + Store.currentId).then((res) => {
      let tmp = WidgetStore.showWidgets(res.data)
      this.setState({
        listWidgets: tmp,
        widgets: res.data
      })
    })
  }

  onResize = () => {
    
  }


  onLayoutChange(layout, layouts) {
    if(Store.mode)
    layout.map((widget, index) => {
      let payload = {
        x: widget.x,
        y: widget.y,
        h: widget.h,
        w: widget.w,
        minH: widget.minH,
        minW: widget.minW,
        maxH: widget.maxH,
        maxW: widget.maxW
      }
      WidgetStore.updatelayout(widget.i, payload)
      return 0
    })
    this.setState({ layouts })
  }

  render() {
    const { listWidgets, layouts } = this.state
    let position = 0
    let widgets = listWidgets.map((widget) => {
      return (
        <div key={widget.key}
          data-grid={{
            x: (widget.props.layout.x !== undefined)?widget.props.layout.x:position % 12,
            y: (widget.props.layout.y !== undefined)?widget.props.layout.y:Infinity,
            w: widget.props.layout.w,
            h: widget.props.layout.h,
            minW: widget.props.layout.minW,
            minH: widget.props.layout.minH,
            maxW: widget.props.layout.maxW,
            maxH: widget.props.layout.maxH
            // autoSize: true
          }}>
          {widget}
        </div>
      )
    })
    // function calculateWH(widthPx, heightPx, colWidth, rowHeight, margin) {
    //   let w = Math.ceil((widthPx - margin[0]) / (colWidth + margin[0]));
    //   let h = Math.ceil((heightPx - margin[1]) / (rowHeight + margin[1]));
    //   return [w, h];
    // };
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
            breakpoints={{ lg: 1140, md: 960, sm: 720, xs: 540 }}
            cols={{ lg: 12, md: 9, sm: 6, xs: 3 }}
            layouts={layouts}
            rowHeight={25}
            isDraggable={Store.mode}
            isResizable={Store.mode}
            onLayoutChange={(layout, layouts) =>
              this.onLayoutChange(layout, layouts)
            }>
            {(listWidgets)?widgets:<Skeleton/>}
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
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {}
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key]
}

// function saveToLS(key, value) {
//   console.log(key, value)
//   if (global.localStorage) {
//     global.localStorage.setItem(
//       "rgl-8",
//       JSON.stringify({
//         [key]: value
//       })
//     )
//   }
// }