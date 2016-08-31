import React from 'react'

class Row extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Row