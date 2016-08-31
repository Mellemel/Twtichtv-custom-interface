import React from 'react'
import Header from './components/header'
import Streamer from './components/streamer'


class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      featured: [
        {
          title: '',
          image: '',
          text: '',
          stream: {
            game: '',
            viewers: 0,
            channel: {
              name: ''
            }
          }
        }]
    }
  }
  componentDidMount() {
    var url = 'https://api.twitch.tv/kraken/streams/featured'
    $.ajax({
      url: url,
      cache: false,
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
    var streamers = this.state.featured.map((streamer) => {
      return <Streamer key={streamer.title} data={streamer} />
    })
    return (
      <div className='row'>
        <div className='col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2'>
          <Header />
          {streamers}
        </div>
      </div>
    )
  }
}

export default Main


