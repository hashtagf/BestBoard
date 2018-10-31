import React from 'react'
import axios from 'axios'
import { observable } from 'mobx'
import Gauge from '../Widgets/Gauge'
import Progress from '../Widgets/Progress'
import NumberBox from '../Widgets/NumberBox'
import GaugeSpeed from '../Widgets/GaugeSpeed'
import ProgressBar from '../Widgets/ProgressBar'
import Text from '../Widgets/Text'
import Image from '../Widgets/Image'
import ImageCover from '../Widgets/ImageCover'
import Toggle from '../Widgets/Toggle'
import Chart from '../Widgets/Chart'
import List from '../Widgets/List'
import Button from '../Widgets/Button'
import Map from '../Widgets/Map'
import Led from '../Widgets/Led'
import Html from '../Widgets/Html'
import Table from '../Widgets/Table'
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
      widget: payload,
      layout: payload.layout
    }).then((res) => {
      console.log(res)
    })
    LocalStore.insertWidget(boardId, payload)
  }

  updateWidget(widgetId, payload) {
    axios.put(Store.server + '/widget/' + widgetId, { widget: payload }).then((res) =>
      console.log(res)
    )
  }

  updatelayout(widgetId, payload) {
    axios.put(Store.server + '/widget/' + widgetId, {
      layout: payload
    })
  }

  deleteWidget(widgetId) {
    axios.delete(Store.server + '/widget/' + widgetId).then((res) =>
      console.log(res)
    )
  }
  showWidgets(widgets) {
    var listWidgets = widgets.map((widget) => {
    //console.log(NETPIEMicrogear.topics[payload.datasource][payload.value].value)
      switch (widget.widget.typeWidget) {
        case 'Gauge':
          return <Gauge key={widget._id} payload={widget.widget} widgetId={widget._id} layout={widget.layout} />
        case 'Progress':
          return <Progress key={widget._id} payload={widget.widget} widgetId={widget._id} layout={widget.layout} />
        case 'NumberBox':
          return <NumberBox key={widget._id} payload={widget.widget} widgetId={widget._id} layout={widget.layout} />
        case 'GaugeSpeed':
          return <GaugeSpeed key={widget._id} payload={widget.widget} widgetId={widget._id} layout={widget.layout} />
        case 'ProgressBar':
          return <ProgressBar key={widget._id} payload={widget.widget} widgetId={widget._id} layout={widget.layout} />
        case 'Text':
          return <Text key={widget._id} payload={widget.widget} widgetId={widget._id} layout={widget.layout} />
        case 'Image':
          return <Image key={widget._id} payload={widget.widget} widgetId={widget._id} layout={widget.layout} />
        case 'ImageCover':
          return <ImageCover key={widget._id} payload={widget.widget} widgetId={widget._id} layout={widget.layout} />
        case 'Chart':
          return <Chart key={widget._id} payload={widget.widget} widgetId={widget._id} layout={widget.layout} />
        case 'List':
          return <List key={widget._id} payload={widget.widget} widgetId={widget._id} layout={widget.layout} />
        case 'Button':
          return <Button key={widget._id} payload={widget.widget} widgetId={widget._id} layout={widget.layout} />
        case 'Toggle':
          return <Toggle key={widget._id} payload={widget.widget} widgetId={widget._id} layout={widget.layout} />
        case 'Map':
          return <Map key={widget._id} payload={widget.widget} widgetId={widget._id} layout={widget.layout} />
        case 'Led':
          return <Led key={widget._id} payload={widget.widget} widgetId={widget._id} layout={widget.layout} />
        case 'HTML':
          return <Html key={widget._id} payload={widget.widget} widgetId={widget._id} layout={widget.layout} />
        case 'Table':
          return <Table key={widget._id} payload={widget.widget} widgetId={widget._id} layout={widget.layout} />
        default:
          return <h2 key={widget._id} layout={widget.layout} className="item"><span className="item-content">Coming Soon Widgets</span></h2>
      }
    })
    return listWidgets
  }
}

export default new WidgetStore()