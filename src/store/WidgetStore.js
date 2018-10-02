import React from 'react'
import axios from 'axios'
import { observable } from 'mobx'
import Gauge from '../components/Widgets/Gauge'
import Progress from '../components/Widgets/Progress'
import CardBox from '../components/Widgets/CardBox'
import GaugeSpeed from '../components/Widgets/GaugeSpeed'
import ProgressBar from '../components/Widgets/ProgressBar'
import Text from '../components/Widgets/Text'
import Image from '../components/Widgets/Image'
import Chart from '../components/Widgets/Chart'
import List from '../components/Widgets/List'

let server = "http://172.18.6.7:5582/widget"

class WidgetStore {
  @observable widgets = []
  @observable listWidgets = this.showWidgets()
  @observable getWidgets = true

  addWidgets(payload) {
    this.widgets.push(payload)
    this.listWidgets = this.showWidgets()
  }

  addWidgetToDB(_id, payload) {
    this.widgets = []
    axios.post(server + '/', {
      machineId: _id,
      widget: payload
    }).then(function (res) {
      console.log(res)
    }).catch(function (err) {
      console.log(err)
    })
  }

  delWidgetToDB(widgetId) {
    axios.delete(server + '/' + widgetId).then(function (res) {
      console.log(res)
    }).catch(function (err) {
      console.log(err)
    })
  }

  showWidgets() {
    return this.widgets.map((widget) => {
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
        default:
          return <h2>Error</h2>
      }
    })
  }
}

export default new WidgetStore()