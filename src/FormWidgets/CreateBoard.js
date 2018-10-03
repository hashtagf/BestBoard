import React from 'react'
import WidgetsList from './WidgetsList'
class CreateMachine extends React.Component {
  render() {
    return (
      <div className="modal fade" data-backdrop="false" tabIndex="-1" role="dialog" aria-hidden="false" >
        <div className="modal-dialog modal-lg">
          <div className="modal-content text-dark">
            <div className="modal-header">
              <h5 className="modal-title">Create widget</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <WidgetsList />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary"><i className="fas fa-plus-square"></i> add widget</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateMachine
