import React from 'react'
import WidgetStore from '../store/WidgetStore'
import moment from 'moment'
import axios from 'axios'
import './Widget.css'
import HeaderCard from "./HeaderCard"
import Store from '../store/Store'

import {
  XAxis,YAxis,
  CartesianGrid,Tooltip,
  Legend,Area,
  AreaChart,ResponsiveContainer
} from 'recharts'

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { key: 0 }
      ],
      filterSince: '1hour'
    }
    this.handleFilter = this.handleFilter.bind(this)
  }

  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.deleteWidget(widgetId)
  }

  componentDidMount() {
    this.getData(this.state.filterSince)
  }

  getData(filterSince) {
    let granularity = ''
    switch (filterSince) {
      case '24hours': granularity = '30minutes'
        break
      case '3days': granularity = '1hour'
        break
      case '7days': granularity = '3hours'
        break
      default: granularity = '15seconds'
    }
    const payload = this.props.payload
    const netpieAPI = 'https://api.netpie.io/feed/'
    let value = ''
    payload.values.map((val) => value += val.value + ',')
    axios.get(netpieAPI + payload.feedID
      + '?apikey=' + payload.feedAPI
      + '&granularity=' + granularity
      + '&since=' + filterSince
      + '&filter=' + value.substr(0, value.length -1 )
    ).then((res) => {
      this.setState({
        data: res.data.data.map((data, index) => {
          let objAttr = data.values.map((val) => {
            let obj = []
            if (index === 0) {
              obj = {
                'timestamp': val[0],
                ['value' + index]: val[1]
              }
            } else {
              obj = val[1]
            }
            return obj
          })
          return (objAttr)
        })
      })
    })
  }

  handleFilter(e) {
    this.setState({
      filterSince: e.target.value
    })
    this.getData(e.target.value)
  }

  formatXAxis = (tickItem) => {
    const filterSince = this.state.filterSince
    if (filterSince === '1hour' || filterSince === '8hours' || filterSince === '24hours')
      return moment(tickItem).format('HH:mm')
    else
      return moment(tickItem).format('DD-MM-YY')
  }
  checkBtnTime (since) {
    if (this.state.filterSince === since) return 'btn btn-primary btn-sm'
    else  return 'btn btn-secondary btn-sm'
  }
  render() {
    const payload = this.props.payload
    const widgetId = this.props.widgetId
    const data = this.state.data
    var areaColor = []
    var start = parseInt(Store.colorSet[Store.colorUse].colors[2].substr(1),16)
    var stop = (parseInt(Store.colorSet[Store.colorUse].colors[12].substr(1),16))?
    parseInt(Store.colorSet[Store.colorUse].colors[12].substr(1),16):
    parseInt(Store.colorSet[Store.colorUse].colors[13].substr(1),16)
    if (stop < start) start = [stop, stop = start][0];
    let shade = parseInt((stop - start)/data.length,10)
    for (let i = 0; i < data[0].length; i++) {
      data.map((datas, index) => {
        if(index !== 0) 
          data[0][i] = Object.assign({['value'+index]: data[index][i]}, data[0][i])
        return 0
      })
    }
    return (
        <div className="item-content card chart shadowcard rounded-0 widgetChart border-0 col-12 h-100" data-id={widgetId}>
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body">
            <div className="btn-group mb-2" role="group" aria-label="DayMonthYear"  id="scrollbar-style">
              <button type="button"
                className={this.checkBtnTime('1hour')}
                value='1hour'
                onClick={this.handleFilter}
              >
                Last 1 hours
              </button>
              <button type="button"
                className={this.checkBtnTime('8hours')}
                value='8hours'
                onClick={this.handleFilter}
              >
                Last 8 hours
              </button>
              <button type="button"
                className={this.checkBtnTime('24hours')}
                value='24hours'
                onClick={this.handleFilter}
              >
                Last 24 Hours
              </button>
              <button type="button"
                className={this.checkBtnTime('3days')}
                value='3days'
                onClick={this.handleFilter}
              >
                Last 3 Days
              </button>
              <button type="button"
                className={this.checkBtnTime('7days')}
                value='7days'
                onClick={this.handleFilter}
              >
                Last 7 Days
              </button>
            </div>
            <ResponsiveContainer width='100%' aspect={4.0/1.0}>
              <AreaChart data={data[0]}
                margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
              >
                  <defs>

                {
                  data.map((data, index) => {
                    areaColor.push('#'+(start+shade*index).toString(16))
                    return <linearGradient id={'color'+index} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={areaColor[index]} stopOpacity={0.7} />
                      <stop offset="95%" stopColor={areaColor[index]} stopOpacity={0} />
                    </linearGradient>
                  })
                }
                    </defs>

                <XAxis
                  dataKey="timestamp"
                  reversed={true}
                  tickFormatter={this.formatXAxis}
                  domain={['dataMin', 'dataMax']}
                  minTickGap={70}
                />
                <YAxis />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                {
                  data.map((data, index) => 
                    <Area
                    key={index}
                    name={payload.values[index].value}
                    type={payload.type}
                    dataKey={'value' + index}
                    stroke={areaColor[index]}
                    fillOpacity={payload.fillOpacity}
                    fill={'url(#color'+index+')'} />
                  )
                }
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
    )
  }
}

export default Chart