import React from 'react'
import ReactHtmlParser from 'react-html-parser'

class Streamer extends React.Component {
  render() {
    var data = this.props.data
    return (
      <div className='row'>
        <div className='col-sm-4'>
          <img src={data.image} alt={data.title} />
          <p>{data.title}</p>
        </div>
        <div className='col-sm-8'>
          <h1>{data.stream.game}</h1>
          {ReactHtmlParser(data.text)}
        </div>
      </div>
    )
  }
}

export default Streamer