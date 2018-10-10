import React from 'react'

class HeaderCard extends React.Component {

  render() {
    return (
          <h5 className="card-header border-0">{this.props.title}</h5>
    )
  }
}

export default HeaderCard