import React from 'react'
import LoadingSymbol from './LoadingSymbol'

class Streamer extends React.Component {
  constructor() {
    super()
    this.state = {
      data: undefined
    }
  }
  // each streamer will make an ajax call
  componentDidMount() {
    var name = this.props.name
    var url = 'https://api.twitch.tv/kraken/streams/'

    $.ajax({
      url: url + name,
      success: (data) => {
        if (!!data.stream) {
          this.props.onStatusChange(this.props.name)
        }
        this.extractData(data)
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString())
        let data = { stream: false, status: true, name: this.props.name }
        this.setState({ data: data })
      }
    })
  }
  extractData(data) {
    if (!data.stream) {
      let tmpData = { stream: false, status: false, name: this.props.name }
      return this.setState({ data: tmpData })
    }
    let tmpData = {
      name: data.stream.channel.display_name,
      logo: data.stream.channel.logo,
      url: data.stream.channel.url,
      game: data.stream.game,
      viewers: data.stream.viewers,
      preview: data.stream.preview.medium,
      status: data.stream.channel.status,
      mature: data.stream.channel.status,
      language: data.stream.channel.language,
      followers: data.stream.channel.followers,
      views: data.stream.channel.views,
      stream: true
    }
    return this.setState({ data: tmpData })
  }
  render() {
    var data = this.state.data
    // if ajax call has not returned, display loading circle
    if (!data) {
      return (
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <div className='row'>
              <LoadingSymbol />
            </div>
          </div>
        </div>
      )
    }

    // if streamer is not online, display offline properties
    if (!data.stream) {
      return (
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <div className='row'>
              <div className='col-xs-4 col-sm-2'>
                <img className='img-responsive img-thumbnail center-block' src='/images/offline_icon.png'></img>
              </div>
              <div className='col-xs-8 col-sm-10 text-center'>
                <p className='h3 offline'>{data.name}</p>
                <p className='h4'><em>{data.status? 'account closed' : 'offline'}</em></p>
                <span className='glyphicon glyphicon-menu-down'></span>
              </div>
            </div>
          </div>
        </div>
      )
    }
    // if streamer is online, display data
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          {/* start of custom content */}
          <div className='row'>
            <div className='col-xs-4 col-sm-2'>
              <img className='img-responsive img-thumbnail center-block' src={data.logo}/>
            </div>
            <div className='col-xs-8 col-sm-10 text-center'>
              <a href={data.url}>
                <p className='h3 online'>{data.name}</p>
              </a>
              <p className='h4'>{data.game}</p>
              <p>Active Viewers: {data.viewers}</p>
              <a className='glyphicon glyphicon-menu-down' data-toggle="collapse" data-parent="#accordion" href={'#' + data.name}>
              </a>
            </div>
          </div>
          {/* end of custom content */}
        </div>
        <div className='panel-collapse collapse' id={data.name}>
          <div className='panel-body'>
            {/* start of custom content */}
            <div className='row'>
              <div className='col-sm-2 hidden-xs'>
                <img className='img-responsive img-thumbnail center-block' src={data.preview}/>
              </div>
              <div className= 'col-xs-12 col-sm-10 text-center' >
                <p className='h4'>Status: {data.status}</p>
                <p>
                  {'Mature: ' + (data.mature ? 'Yes' : 'No') }
                  {' | Lanugage: ' + data.language}
                  {' | Followers: ' + data.followers}
                  {' | Views: ' + data.views}
                </p>
              </div>
            </div>
            {/* end of custom content */}
          </div>
        </div>
      </div>
    )
  }
}

export default Streamer