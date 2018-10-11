import React from 'react'
import WidgetStore from '../store/WidgetStore'
import moment from 'moment'
import axios from 'axios'
import './Widget.css'
import HeaderCard from "./HeaderCard"

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
    const payload = this.props.payload
    const netpieAPI = 'https://api.netpie.io/feed/'
    axios.get(netpieAPI + payload.feedID
      + '?apikey=' + payload.feedAPI
      + '&granularity=15seconds'
      + '&since=' + filterSince
      + '&filter=' + payload.value
    ).then(function (res) {
      this.setState({
        data: res.data.data[0].values.map((data) => {
          const obj = {
            'timestamp': data[0],
            'value': data[1]
          }
          return obj
        })
      })
    }.bind(this))
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

  render() {
    const payload = this.props.payload
    const widgetId = this.props.widgetId
    return (
      <div className="item Chart col-xl-9 col-lg-9 col-md-12 col-12 text-body mb-3">
        <div className="item-content card shadow rounded-0 widgetChart border-0">
        <HeaderCard title={payload.title} payload={payload} del={this.delWidget.bind(this)} widgetId={widgetId}/>
          <div className="card-body">
            <div className="btn-group mb-2" role="group" aria-label="DayMonthYear">
              <button type="button"
                className="btn btn-secondary btn-sm"
                value='1hour'
                onClick={this.handleFilter}
              >
                Last 1 hours
              </button>
              <button type="button"
                className="btn btn-secondary btn-sm"
                value='8hours'
                onClick={this.handleFilter}
              >
                Last 8 hours
              </button>
              <button type="button"
                className="btn btn-secondary btn-sm"
                value='24hours'
                onClick={this.handleFilter}
              >
                Last 24 Hours
              </button>
              <button type="button"
                className="btn btn-secondary btn-sm"
                value='3days'
                onClick={this.handleFilter}
              >
                Last 3 Days
              </button>
              <button type="button"
                className="btn btn-secondary btn-sm"
                value='7days'
                onClick={this.handleFilter}
              >
                Last 7 Days
              </button>
            </div>
            <ResponsiveContainer width='95%' aspect={4.0/1.0}>
              <AreaChart data={this.state.data}
                margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
              >
                <defs>
                  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
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
                <Area
                  name={payload.value}
                  type={payload.type}
                  dataKey="value"
                  stroke={payload.stroke}
                  fillOpacity={payload.fillOpacity}
                  fill={payload.fill} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }
}

export default Chart