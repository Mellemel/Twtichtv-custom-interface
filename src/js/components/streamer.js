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
        this.setState({ data: data })
        if (!!data.stream) {
          this.props.onStatusChange(this.props.name)
        }
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString())
      }
    })
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
    data = this.state.data
    // if streamer is not online, display offline properties
    if (!data.stream) {
      return (
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <div className='row'>
              <div className='col-xs-4 col-sm-2'>
                <img className='img-responsive img-rounded center-block' src='/images/offline_icon.png'></img>
              </div>
              <div className='col-xs-8 col-sm-10 text-center'>
                <p className='h3'>{this.props.name}</p>
                <p className='h4'>offline</p>
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
              <img className='img-responsive img-rounded center-block' src={data.stream.channel.logo}/>
            </div>
            <div className='col-xs-8 col-sm-10 text-center'>
              <a href={data.stream.channel.url}>
                <p className='h3'>{data.stream.channel.display_name}</p>
              </a>
              <p className='h4'>{data.stream.game}</p>
              <p>viewers: {data.stream.viewers}</p>
              <a className='glyphicon glyphicon-menu-down' data-toggle="collapse" data-parent="#accordion" href={'#' + this.props.name}>
              </a>
            </div>
          </div>
          {/* end of custom content */}
        </div>
        <div className='panel-collapse collapse' id={this.props.name}>
          <div className='panel-body'>
            {/* start of custom content */}
            <div className='row'>
              <div className='col-xs-4 col-sm-2'>
                <img className='img-responsive img-rounded center-block' src={data.stream.preview.medium}/>
              </div>
              <div className= 'col-xs-8 col-sm-10 text-center' >
                <p>Status: {data.stream.channel.status}</p>
                <p>
                  {'Mature: ' + (data.stream.channel.mature ? 'Yes' : 'No')}
                  {' | Lanugage: ' + data.stream.channel.language}
                  {' | Followers: ' + data.stream.channel.followers}
                  {' | Views: ' + data.stream.channel.views}
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