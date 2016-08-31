import React from 'react'

class Streamer extends React.Component {
  render() {
    var data = this.props.data
    data.text.replace(/>(.|\n)*?</, (match)=>{
      data.text = match.substring(1, match.length-1)
    })

    return (
      <div className='row streamers'>
        <div className='col-sm-4 text-center'>
          <img src={data.image} alt={data.title} />
          <h4>{data.stream.channel.name}</h4>
        </div>
        <div className='col-sm-8'>
          <h2>{data.title}<br />
          <small className='text-muted'>Active Viewers: {data.stream.viewers}</small></h2>
          <p>{data.text}</p>
        </div>
      </div>
    )
  }
}

export default Streamer