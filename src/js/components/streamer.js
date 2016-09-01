import React from 'react'
import ReactHtmlParser from 'react-html-parser'

class Streamer extends React.Component {
  render() {
    var data = this.props.data
    var tmp = data.text.match(/href="(.+?)"/)[1] || []
    data.text = data.text.replace(tmp, 'https://twitch.tv'+ tmp)

    return (
      <div className='row streamers'>
        <div className='col-sm-4 text-center'>
          <img className='img-responsive img-rounded center-block' src={data.image} alt={data.title} />
          <h4>{data.stream.channel.name}</h4>
        </div>
        <div className='col-sm-8'>
          <h2>{data.title}<br />
          <small className='text-muted'>Active Viewers: {data.stream.viewers}</small></h2>
          {ReactHtmlParser(data.text)}
        </div>
      </div>
    )
  }
}

export default Streamer