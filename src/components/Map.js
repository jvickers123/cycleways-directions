import React, {useState, useRef } from "react"

// MAPBOX
import ReactMapGl, { Source, Layer, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
mapboxgl.workerClass = MapboxWorker


const Map = () => {

  // STATE
  const [viewPort, setViewPort] = useState({
    latitude: 51.5,
    longitude: -0.118,
    zoom: 10
  })

  // REF
  const mapRef = useRef()

  return (
    <div className='map-container'>
      <ReactMapGl 
          {...viewPort}
          onMove={e => setViewPort(e.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle='mapbox://styles/jvickers/cl1kvl366000015qgczuks22r'
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          ref={mapRef}
        >
          </ReactMapGl>
    </div>
  )
    
}

export default Map