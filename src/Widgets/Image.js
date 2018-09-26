import React from 'react'
import WidgetStore from '../../store/WidgetStore'

class Image extends React.Component {
  delWidget() {
    const widgetId = this.props.widgetId
    WidgetStore.delWidgetToDB(widgetId)
  }

  render() {
    const payload = this.props.payload
    return (
      <div className="Image col-xl-6 col-lg-6 col-md-9 col-sm-12 text-body mb-3">
        <div className="card border-primary shadow rounded-0 border-10">
          <h5 className="card-header">{payload.title}</h5>
          <div className="card-body ">
            <img src={payload.file} className="img-fluid img-thumbnail widgetImage" alt="base64"/>
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

export default Image 