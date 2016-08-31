import React from 'react'
import ReactDom from 'react-dom'
import Main from './main'

$(document).ready(() => {
  ReactDom.render(<Main />, document.getElementById('main'))
})

