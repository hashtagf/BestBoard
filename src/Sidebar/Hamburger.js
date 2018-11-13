/* eslint no-eval: 0 */
import React, { Component } from 'react'
import './Hamburger.css'
import Store from '../store/Store'
import { observer } from 'mobx-react'
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import NETPIEMicrogear from '../store/Microgear'
import moment from 'moment'
import axios from 'axios'
import socketIOClient from 'socket.io-client'
import DataSourceStore from '../store/DatasourceStore'
import ClickOutside from 'react-click-outside';

const socket = socketIOClient(Store.server)
@observer
class Hamburger extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.clickSetting(!Store.mode)
    /* this.setState({
      mode: Store.mode
    }) */
  }
  componentWillMount () {
    if (true) {
      this.getDatasource()
      this.response()
    }
  }
  response = () => {
    socket.on('update-datasource', (msg) => {
      console.log('update-datasorce', msg)
      this.getDatasource()
    })
    socket.on('error', function(exception) {
      console.log('SOCKET ERROR', exception)
      socket.destroy()
    })
  }

  getDatasource() {
    axios.get(Store.server + '/datasource/').then((res) => {
      DataSourceStore.datasources = res.data
      NETPIEMicrogear.createMicrogear(res.data)
    })
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" id="sidebarCollapse" className="navbar-btn">
                <span></span>
                <span></span>
                <span></span>
              </button>
              
            </div>
            <div className="navbar-brand my-auto text-truncate"><strong>{Store.pageName}</strong></div>
            <div className="menu-head">
              {Store.notiSetting.forms?<Notification payload={Store.notiSetting}/>:null}
              <Tooltip placement="bottom" trigger={['hover']} overlay={(Store.mode)?'Done':'Setting'}>
              <i onClick={this.handleClick} className={Store.mode?"fas fa-save":"fas fa-cog"}></i>
              </Tooltip>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
@observer
class Notification extends Component {
  constructor (props) {
    super(props)
    this.state= {
      notis: [],
      seen: 0
    }
  }

  componentDidMount() {
    const payload = this.props.payload
    if(payload.forms)
    payload.forms.forEach((col, index) => {
        //if (NETPIEMicrogear.statusOnline[col.datasource]) {
        if (true) {
          const microgear = NETPIEMicrogear.microgear[col.datasource]
          
          microgear.on('message', (topic, msg) => {
            if (col.value === topic) {
              let value = msg + ''
              if (col.manual) {
                try {eval(col.jsValue)}
                catch (err){
                  if(err!==null) value = msg+''
                }
              }
              else value = value.split(col.filter)[col.filterIndex]
              let flag = false
              let valueCondition = col.valueAlert + ''
              switch (col.expressionAlert) {
                case '=':flag = value === valueCondition
                  break
                case '≠':flag = value !== valueCondition
                  break
                case '>':flag = value > valueCondition
                  break
                case '<':flag = value < valueCondition
                  break
                case '>=':flag = value >= valueCondition
                  break
                case '<=':flag = value <= valueCondition
                  break
                //if (payload.columns[0].type === 'time')
              }
              if (flag) {
                let temp = this.state.notis
                if (temp.length >= 100) temp.shift()

                let now = new Date()
                temp.push({
                  msg: col.msg,
                  time: now
                })
                this.setState({
                  notis: temp,
                  seen: this.state.seen + 1
                })
              }
            }
          })
        } else console.log('error : not Connect datasource !!')
      
    })
  }
  handleSeen = ({target}) => {
    this.setState({
      seen: 0
    });   
  }
  render () {
    //console.log(Store.notiSetting)
    let notis = []
    
    if (this.state.notis.length!==0) {
      this.state.notis.map((noti,index)=>
      notis.push(
      <div key={index} className="noti">
        {noti.msg}<br/>
        <p className={(this.state.notis.length - index <= this.state.seen)?"text-danger mb-0":"text-muted mb-0"}>{moment(noti.time).fromNow()}</p>
      </div>)
      ) 
    }
    else notis.push(<span key={null}>You don't have<br/>any notification</span>)
    // console.log(notis)
    let notiList = <div className="notiList" id="scrollbar-style">{notis.reverse()}</div>
    return (
      
      <Tooltip placement="bottom" trigger={['click']} overlay={notiList}>
      <ClickOutside onClickOutside={this.handleSeen}>
      <span className="mr-3">
      
        <i className="fas fa-bell mr-2"></i>
        
        {(this.state.seen>0)?<div className="badge bg-danger text-white">{this.state.seen}</div>:null}
        
      </span></ClickOutside>
      </Tooltip>
    )
  }
}
export default Hamburger