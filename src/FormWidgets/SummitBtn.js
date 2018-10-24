import React from 'react'

class SummitBtn extends React.Component {

  render() {
    var btn = <span><i className="fas fa-plus-square"></i> Add widget</span>
    if (this.props.editWidget) btn = <span><i className="fas fa-pen-square"></i> Save widget</span>
    
    return (
        <div className="row justify-content-end">
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button"
              className="btn btn-primary border-0"
              onClick={this.props.handleSubmit}
              data-dismiss="modal" aria-label="Close"
            >
              {btn}              
            </button>
          </div>
        </div>
    )
  }
}

export default SummitBtn

