import React from 'react'
import WidgetsList from './WidgetsList'
import Store from '../store/Store'
import { observer } from 'mobx-react'
@observer
class CreateBoard extends React.Component {
  render() {
    return (
      <div className="modal fade ModalCreate" data-backdrop="true" tabIndex="-1" id="scrollbar-style" role="dialog" aria-hidden="false" >
        <div className="modal-dialog modal-lg">
          <div className="modal-content text-dark createwidget">
            <div className="modal-header">
              <h5 className="modal-title">{(Store.editWidget.typeWidget)?'Edit widget':'Create widget'}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <WidgetsList editWidget={Store.editWidget}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateBoard
