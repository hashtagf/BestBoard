import React from 'react'
import FormCondition from '../FormWidgets/Input/FormCondition'
import './WidgetsList.css'
import Store from '../store/Store'
import { observer } from 'mobx-react'

@observer
class CreateBoard extends React.Component {
  hanldleClose () {
    
  }
  render() {
    return (
      <div className="modal fade ModalCreate" data-backdrop="true" tabIndex="-1" id="scrollbar-style" role="dialog" aria-hidden="true" >
        <div className="modal-dialog modal-lg">
          <div className="modal-content text-dark shadowcard createwidget">
            <div className="modal-header">
              <h5 className="modal-title">Notification</h5>
              <button type="button" onClick={this.hanldleClose} className="close" data-dismiss="modal"  aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <FormCondition/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateBoard
