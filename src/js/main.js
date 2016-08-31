import React from 'react'
import Header from './components/header'
import Streamer from './components/streamer'


class Main extends React.Component {
  componentDidMount() {
    var url = 'https://api.twitch.tv/kraken/streams/featured'
    $.ajax({
      url: url,
      success: (data) => {
        console.log(data)
        this.setState({ featured: data.featured })
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString())
      }
    })
  }
  render() {
    var streamers = this.state.data.featured.map((streamer)=>{
      return (<Streamer key={streamer.} data={streamer} />)
    })
    return (
      <div className='row'>
        <div className='col-sm-8 col-sm-offset-2'>
          <Header />
          {streamers}
        </div>
      </div>
    )
  }
}

export default Main


