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
import Toggle from '../Widgets/Toggle'
import LocalStore from './LocalStore'
import Store from './Store'
class WidgetStore {
  @observable widgets = []
  // @observable listWidgets = []

  pushWidgets(payload) {
    this.widgets.push(payload)
    this.listWidgets = this.showWidgets()
  }

  createWidget(boardId, payload) {
    axios.post(Store.server + '/widget', {
      boardId: boardId,
      widget: payload
    }).then((res) => {
      console.log(res)
    })
    LocalStore.insertWidget(boardId, payload)
  }

  updateWidget(widgetId, payload) {
    console.log('Id', widgetId, payload)
    axios.put(Store.server + '/widget/' + widgetId, payload).then((res) =>
      console.log(res)
    )
  }

  deleteWidget(widgetId) {
    axios.delete(Store.server + '/widget/' + widgetId).then((res) =>
      console.log(res)
    )
  }

  showWidgets(widgets) {
    var listWidgets = widgets.map((widget) => {
      var content
      switch (widget.widget.typeWidget) {
        case 'Gauge':
          content = <Gauge key={widget._id} payload={widget.widget} widgetId={widget._id} />
          break
        case 'Progress':
          content = <Progress key={widget._id} payload={widget.widget} widgetId={widget._id} />
          break
        case 'CardBox':
          content = <CardBox key={widget._id} payload={widget.widget} widgetId={widget._id} />
          break
        case 'GaugeSpeed':
          content = <GaugeSpeed key={widget._id} payload={widget.widget} widgetId={widget._id} />
          break
        case 'ProgressBar':
          content = <ProgressBar key={widget._id} payload={widget.widget} widgetId={widget._id} />
          break
        case 'Text':
          content = <Text key={widget._id} payload={widget.widget} widgetId={widget._id} />
          break
        case 'Image':
          content = <Image key={widget._id} payload={widget.widget} widgetId={widget._id} />
          break
        case 'Chart':
          content = <Chart key={widget._id} payload={widget.widget} widgetId={widget._id} />
          break
        case 'List':
          content = <List key={widget._id} payload={widget.widget} widgetId={widget._id} />
          break
        case 'Button':
          content = <Button key={widget._id} payload={widget.widget} widgetId={widget._id} />
          break
        case 'Toggle':
          content = <Toggle key={widget._id} payload={widget.widget} widgetId={widget._id} />
          break
        default:
          content = <h2 key={widget._id} className="item"><span className="item-content">Coming Soon Widgets</span></h2>
          break
      }
      return (content)
    })
    return listWidgets

  }
}

export default new WidgetStore()