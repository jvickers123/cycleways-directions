import React, { useState } from 'react'

// COMPONENTS
import Map from './components/Map'
import Search from './components/Search'
import Directions from './components/Directions'

const App = () => {
  
  // STATE
  const [originalRoute, setOriginalRoute] = useState('')
  const [startPoint, setStartPoint] = useState([])
  const [endPoint, setEndPoint] = useState([])

  return (
    <>
      <Search setOriginalRoute={setOriginalRoute} setStartPoint={setStartPoint} setEndPoint={setEndPoint}/>
      <Map originalRoute={originalRoute} startPoint={startPoint} endPoint={endPoint}/>
      <Directions />
    </>
  )
}

export default App
