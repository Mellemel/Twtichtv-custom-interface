import React from 'react'
import Streamer from './streamer'

class StreamerList extends React.Component {
  constructor() {
    super()

    this.state = {
      streamers: ['riotgames', 'starladder1', 'beyondthesummit', 'esl_csgo', 'tsm_theoddone', 'tsm_dyrus', 'imaqtpie', 'garenatw', 'Nightblue3', 'nl_kripp', 'freecodecamp']
    }

    this.state.streamers = this.state.streamers.map((name) => {
      return { name: name, online: false }
    })

    this.statusChange = this.statusChange.bind(this)
  }

  statusChange(name) {
    this.state.streamers.forEach(function (streamer) {
      if (streamer.name == name) {
        streamer.online = true
      }
    })
    this.sortStreamersByStatus()
  }

  sortStreamersByStatus() {
    this.state.streamers = this.state.streamers.sort((a, b) => {
      return (a.online === b.online) ? 0 : a.online ? -1 : 1
    })
    this.setState({ streamers: this.state.streamers })
  }

  render() {
    var streamers = this.state.streamers.map((streamer) => {
      return <Streamer key={streamer.name} name={streamer.name} onStatusChange={this.statusChange}/>
    })
    return (
      <div className='panel-group' id='accordion'>
        {streamers}
      </div>
    )
  }
}

export default StreamerList