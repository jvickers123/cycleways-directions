import React, {useState, useEffect, useRef } from 'react'

// MAPBOX
import ReactMapGl from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'

// TURF
import polyline from 'polyline'
import linestring from 'turf-linestring'
import bbox from '@turf/bbox'
import { polygonToLine } from '@turf/polygon-to-line'
import buffer from '@turf/buffer'
import lineIntersect from '@turf/line-intersect'
import distance from '@turf/distance'

// DATA
import data from '../data/CycleRoutes.json'


mapboxgl.workerClass = MapboxWorker

const Map = ({ originalRoute, startPoint, endPoint }) => {

  // STATE
  const [viewPort, setViewPort] = useState({
    latitude: 51.5,
    longitude: -0.118,
    zoom: 10
  })

  // REF
  const mapRef = useRef()

  useEffect(() => {
    if (originalRoute) {
      // decode route to geojson linstring
      const backwards = polyline.decode(originalRoute)
      const ogRoute = backwards.map(coords => coords.reverse())
      const OGRouteLine = linestring(ogRoute)

      // select TFL routes on route
      const routeBbox = bbox(OGRouteLine)
      const bboxEdge1 = mapRef.current.project([routeBbox[0], routeBbox[1]])
      const bboxEdge2 = mapRef.current.project([routeBbox[2], routeBbox[3]])
      const cyclewaysInsideBbox = mapRef.current.queryRenderedFeatures([[bboxEdge1.x, bboxEdge1.y], [bboxEdge2.x, bboxEdge2.y]], { layers: ['cycleroutes'] })
      const routeIDs = new Set(cyclewaysInsideBbox.map(route => route.properties.OBJECTID))
      const TFLRoutes = data.features.filter(feature => routeIDs.has(feature.properties.OBJECTID))
      console.log(TFLRoutes)
      
      // buffer tfl routes
      const bufferedTFL = TFLRoutes.map(geoJSONFile => polygonToLine(buffer(geoJSONFile, 0.02), {properties: geoJSONFile.properties}))
      
      // find where route intersects with buffer
      const intersects = bufferedTFL.map(shape => [shape.properties.OBJECTID, lineIntersect(shape, OGRouteLine)])
      const filteredIntersects = intersects.filter(marker => marker[1].features.length)
      console.log(filteredIntersects)

      // filter intersects by which one's actually used
      const distances = []
      filteredIntersects.forEach(item => item[1].features.forEach(feature => distances.push([item[0], distance(startPoint, feature.geometry.coordinates), distance(endPoint, feature.geometry.coordinates), feature])))
      const closest = []
      distances.forEach(arr => {
        if (!closest.length) {
          closest.push(arr)
        }
        else {
          const index = closest.findIndex(item => item[0] === arr[0])
          if (index === -1) {
            closest.push(arr)
          }
          else if (arr[1] < closest[index][1]) {
            closest[index] = arr
          }
        }
      })
      closest.sort((a, b) => a[1] - b[1])
      const closestEnd = []
      const distanceEnd = []
      filteredIntersects.forEach(item => item[1].features.forEach(feature => distanceEnd.push([item[0], distance(endPoint, feature.geometry.coordinates), feature])))
      distanceEnd.forEach(arr => {
        if (!closestEnd.length) {
          closestEnd.push(arr)
        }
        else {
          const index = closestEnd.findIndex(item => item[0] === arr[0])
          if (index === -1) {
            closestEnd.push(arr)
          }
          else if (arr[1] < closestEnd[index][1]) {
            closestEnd[index] = arr
          }
        }
      })
      closestEnd.sort((a, b) => b[1] - a[1])

      console.log(distances, closest, distanceEnd, closestEnd)
      // removes unnessecary intersects (need to check this one)
      closest.forEach((item, startInd) => {
        const sameLineEndInd = closestEnd.findIndex(arr => arr[0] === item[0])
        closestEnd.forEach((arr, i) => {
          if (i >= startInd && i < sameLineEndInd) {
            const startIndex = closest.findIndex(item => item[0] === arr[0])
            closest.splice(startIndex, 1)
          }
        })
      })

      const filteredEndPoints = closestEnd.filter(item => closest.findIndex(arr => arr[0] === item[0]) !== -1)
      console.log(filteredEndPoints, closest)
      // check the equivalent distance to end
      // remove all that are behind 
      // find next closest in closest array
      // check next distance to end
      // if no more closest then finsish
      
      
      // display data

    }
    
  }, [originalRoute, startPoint, endPoint])
  


  // re-search directions from markers
  // set reduced directions


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