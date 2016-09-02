import React from 'react'
import Header from './components/header'
import StreamerList from './components/streamerlist'

class Main extends React.Component {
  render() {
    return (
      <div className='row'>
        <div className='col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2'>
          <Header />
          <StreamerList />
        </div>
      </div>
    )
  }
}

export default Main