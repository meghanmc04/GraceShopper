import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import Navbar from './components/Nav-Bar'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <CssBaseline>
        <Navbar />
        <Routes />
      </CssBaseline>
    </div>
  )
}

export default App
