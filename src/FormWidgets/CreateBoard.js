import React from 'react'
import WidgetsList from './WidgetsList'
class CreateMachine extends React.Component {
  render() {
    return (
      <div className="modal fade ModalCreate"  data-backdrop="false" tabIndex="-1" role="dialog" aria-hidden="false" >
        <div className="modal-dialog modal-lg">
          <div className="modal-content text-dark">
            <form>
              <div className="modal-header">
                <h5 className="modal-title">Create widget</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <WidgetsList />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateMachine
