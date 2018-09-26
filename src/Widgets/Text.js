import React from 'react'
import WidgetStore from '../../store/WidgetStore'

class Text extends React.Component {
  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.delWidgetToDB(widgetId)
  }

  render() {
    const payload = this.props.payload
    return (
      <div className="Text col-xl-3 col-lg-4 col-md-6 col-sm-12 text-body mb-3">
        <div className="card border-white shadow rounded-0 border-10 widgetCard">
          <h5 className="card-header">{payload.title}</h5>
          <div className="card-body">
            <textarea name="text"
              readOnly
              cols="16"
              rows="5"
              className="form-control"
              defaultValue={payload.text}
            />

          </div>
          <div className="card-footer text-right">
            <a href="/#" data-toggle="modal" data-target=".ModalCreate"><i className="fas fa-cog text-dark mr-3"></i></a>
            <button className="btn" onClick={this.delWidget.bind(this)} ><i className="fas fa-trash-alt text-danger"></i></button>
          </div>
        </div>
      </div>
    )
  }
}

export default Text