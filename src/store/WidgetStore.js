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
    axios.put(Store.server + '/widget/' + widgetId, {widget : payload}).then((res) =>
      console.log(res)
    )
  }

  updateIndexMuuri(widgetId, payload) {
    axios.put(Store.server + '/widget/' + widgetId, {
      indexMuuri : payload
    }).then((res) =>
      console.log(res)
    )
    
  }

  deleteWidget(widgetId) {
    axios.delete(Store.server + '/widget/' + widgetId).then((res) =>
      console.log(res)
    )
  }

  showWidgets(widgets) {
    var widgetsSort = widgets.sort((beforeIndex, afterIndex) => {return beforeIndex.indexMuuri - afterIndex.indexMuuri})
    console.log(widgetsSort)
    var listWidgets = widgetsSort.map((widget) => {
      switch (widget.widget.typeWidget) {
        case 'Gauge':
          return <Gauge key={widget._id} payload={widget.widget} widgetId={widget._id} />         
        case 'Progress':
          return<Progress key={widget._id} payload={widget.widget} widgetId={widget._id} />          
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
        case 'Toggle':
          return <Toggle key={widget._id} payload={widget.widget} widgetId={widget._id} />      
        default:
          return <h2 key={widget._id} className="item"><span className="item-content">Coming Soon Widgets</span></h2>
      }
    })
    return listWidgets
  }
}

export default new WidgetStore()