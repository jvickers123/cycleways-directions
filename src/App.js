import React, { useState } from 'react'

// COMPONENTS
import Map from './components/Map'
import Search from './components/Search'
import Directions from './components/Directions'

const App = () => {
  
  // STATE
  const [originalRoute, setOriginalRoute] = useState('')

  return (
    <>
      <Search setOriginalRoute={setOriginalRoute}/>
      <Map originalRoute={originalRoute}/>
      <Directions />
    </>
  )
}

export default App
