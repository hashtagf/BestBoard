import React from 'react'
import axios from 'axios'
import { observable } from 'mobx'
import Gauge from '../Widgets/Gauge'
import Progress from '../Widgets/Progress'
import CardBox from '../Widgets/CardBox'
import GaugeSpeed from '../Widgets/GaugeSpeed'
import ProgressBar from '../Widgets/ProgressBar'
import Text from '../Widgets/Text'
import Image from '../Widgets/Image'
import Chart from '../Widgets/Chart'
import List from '../Widgets/List'
import Button from '../Widgets/Button'
import LocalStore from './LocalStore'

class WidgetStore {
  @observable widgets = []
  // @observable listWidgets = []
  @observable server = 'http://172.18.6.7:5582'

  pushWidgets(payload) {
    this.widgets.push(payload)
    this.listWidgets = this.showWidgets()
  }

  createWidget(boardId, payload) {
    axios.post(this.server + '/widget', {
      boardId: boardId,
      widget: payload
    }).then((res) => {
      console.log(res)
    })
    LocalStore.insertWidget(boardId, payload)
  }

  updateWidget(widgetId, payload) {
    axios.put(this.server + '/widget/' + widgetId, payload).then((res) =>
      console.log(res)
    )
  }

  deleteWidget(widgetId) {
    axios.delete(this.server + '/widget/' + widgetId).then((res) =>
      console.log(res)
    )
  }

  showWidgets(widgets) {
    var listWidgets = widgets.map((widget) => {
      switch (widget.widget.typeWidget) {
        case 'Gauge':
          return <Gauge key={widget._id} payload={widget.widget} widgetId={widget._id} />
        case 'Progress':
          return <Progress key={widget._id} payload={widget.widget} widgetId={widget._id} />
        case 'CardBox':
          return <CardBox key={widget._id} payload={widget.widget} widgetId={widget._id} />
        case 'GaugeSpeed':
          return <GaugeSpeed key={widget._id} payload={widget.widget} widgetId={widget._id} />
        case 'ProgressBar':
          return <ProgressBar key={widget._id} payload={widget.widget} widgetId={widget._id} />
        case 'Text':
          return <Text key={widget._id} payload={widget.widget} widgetId={widget._id} />
        case 'Image':
          return <Image key={widget._id} payload={widget.widget} widgetId={widget._id} />
        case 'Chart':
          return <Chart key={widget._id} payload={widget.widget} widgetId={widget._id} />
        case 'List':
          return <List key={widget._id} payload={widget.widget} widgetId={widget._id} />
        case 'Button':
          return <Button key={widget._id} payload={widget.widget} widgetId={widget._id} />
        default:
          return <h2 key={widget._id} className="item"><span className="item-content">Coming Soon Widgets</span></h2>
      }
    })
    return listWidgets

  }
}

export default new WidgetStore()