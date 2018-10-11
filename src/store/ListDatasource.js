import React from 'react'

class ListDatasources extends React.Component {
  render() {
    const datasource = this.props.datasource
    return (
      <option value={datasource._id} >{datasource.datasource.name}</option>
    ) 
  }
}

export default ListDatasources