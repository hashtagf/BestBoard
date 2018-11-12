import React, { Component } from 'react'
import './Hamburger.css'
import Store from '../store/Store'
import { observer } from 'mobx-react'
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import NETPIEMicrogear from '../store/Microgear'
@observer
class Hamburger extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.clickSetting(!Store.mode)
    /* this.setState({
      mode: Store.mode
    }) */
  }
  render() {
    if (Store.notiSetting.forms) {
      console.log(Store.notiSetting.forms[0].datasource+'')
      console.log(NETPIEMicrogear.statusOnline[Store.notiSetting.forms[0].datasource+''])
    }
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
              <i onClick={this.handleClick} className={Store.mode?"fas fa-save text-success":"fas fa-cog"}></i>
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
      notis: []
    }
  }
  componentDidMount() {
    const payload = this.props.payload
    if(payload.forms)
    payload.forms.forEach((col, index) => {
      console.log(col.valueAlert,col.datasource)
        if (NETPIEMicrogear.statusOnline[col.datasource]) {
          const microgear = NETPIEMicrogear.microgear[col.datasource]
          
          microgear.on('message', (topic, msg) => {
            if (col.value === topic) {
              let value = msg + ''
              let now = new Date()
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
                let now = new Date()
                temp.push({
                  msg: col.msg,
                  time: now
                })
                this.setState({
                  notis: temp
                })
              }
            }
          })
        } else console.log('error : not Connect datasource !!')
      
    })
  }

  render () {
    //console.log(Store.notiSetting)
    let notis = <span>don't have</span>
    console.log(this.state.notis)
    if (this.state.notis.length!==0)
    notis = this.state.notis.map((noti)=>
      <div className="row">
        <div className="col-1"><i className="fas fa-save text-success"></i></div>
        <div>{noti.msg}{noti.time}</div>
      </div>
    )
    return (
      <Tooltip placement="bottom" trigger={['hover']} overlay={notis}>
        <i className="fas fa-bell mr-4"></i>
      </Tooltip>
    )
  }
}
export default Hamburger