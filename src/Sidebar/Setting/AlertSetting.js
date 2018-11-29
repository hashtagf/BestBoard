import React, { Component } from 'react'
import { observer } from 'mobx-react'
import FormCondition from '../../FormWidgets/Input/FormCondition'
import FormMultiple from '../../FormWidgets/Input/FormMultiple'
import InputText from '../../FormWidgets/Input/InputText'
import FormInputBasic from '../../FormWidgets/Input/FormInputBasic'
import Store from '../../store/Store'
import SummitBtn from '../../FormWidgets/SummitBtn'

@observer
class AlertSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }
  handleOpen = (e) => {
    this.setState({
      showModal: true
    })
  }
  handleClose = (e) => {
    this.setState({
      showModal: false
    })
  }
  render() {
    return (
        <li>
          {/* <a className="no-collaspe"> Notification </a> */}
          <a data-toggle="modal" data-target=".ModalNoti" onClick={this.handleOpen}>
              Notification
              <i className="fas fa-cog ml-3"></i>
          </a>
          {(this.state.showModal)?<SettingNotification handleClose={this.handleClose}/>:null}

        </li>
    )
  }
}

@observer
class SettingNotification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      forms: [
        {
          title: 'Noti1',
          value: '',
          datasource: '',
          body: '',
          filter: ',',
          filterIndex: 0,
          jsValue: '',
          manual: false,
          expressionAlert: '',
          valueAlert: '',
          msg: ''
        }
      ]
    }
  }
  componentDidMount() {
    let notiSetting = Store.notiSetting
    console.log(notiSetting)
    if (notiSetting.forms) {
      this.setState({
        forms: notiSetting.forms
      })
    }
    //else this.reState()
  }
  handlePayload = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  reState () {
    this.setState({
      forms: [{
        title: 'Noti1',
        datasource: '',       
        body: '',
        value: '',
        filter: ',',
        filterIndex: 0,
        jsValue: '',
        manual: false,
        expressionAlert: '',
        valueAlert: '',
        msg: ''
      }]
    })
  }
  addPopup = () => {
    var tmp = this.state.forms
    tmp.push(
      {
        title: 'Noti' + tmp.length,
        value: '',
        datasource: '',
        body: '',
        filter: ',',
        filterIndex: 0,
        jsValue: '',
        manual: false,
        expressionAlert: this.state.expressionAlert,
        valueAlert: this.state.valueAlert,
        msg: ''
      }
    )
    this.setState({
      forms: tmp
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    //Store.notiSetting = this.state
    Store.updateNoti(this.state)
    //this.reState()
  }
  render() {
    let payload = this.state
    return (
      <div className="modal fade ModalNoti" data-backdrop="true" tabIndex="-1" id="scrollbar-style" role="dialog" aria-show="true" >
        <div className="modal-dialog modal-lg">
          <div className="modal-content text-dark shadowcard createwidget">
            <div className="modal-header">
              <h5 className="modal-title">Notification</h5>
              <button type="button" onClick={this.props.hanldleClose} className="close" data-dismiss="modal"  aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <FormMultiple
                handlePayload={this.handlePayload}
                title={'Topic'}
                addBtnFunc={this.addPopup}
                forms={payload.forms}
              >
                <FormInputBasic values={payload} />
                <FormCondition event="Alert" title={'alert'} values={payload}/>
                <InputText title="Msg" name="msg" placeholder="too cold!!"/>
              </FormMultiple>
              <SummitBtn handleSubmit={this.handleSubmit} editWidget={"b"}/>

            </div>
            
            
          </div>
        </div>
      </div>
    )
  }
}


export default AlertSetting
