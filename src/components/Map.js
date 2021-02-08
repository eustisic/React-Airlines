import React from 'react'
import { getAirportByCode } from '../data.js'

const RouteMap = ({ selected }) => {
  const MappedRoutes = () => (
    selected.map((route, index) => {
      const src = getAirportByCode(route.src)
      const dest = getAirportByCode(route.dest)

      return (
        <g key={index}>
          <circle className="source" cx={src.long} cy={src.lat}>
            <title></title>
          </circle> 
          <circle className="destination" cx={dest.long} cy={dest.lat}>
            <title></title>
          </circle>
          <path d={`M${src.long} ${src.lat} L ${dest.long} ${dest.lat}`} />
        </g>
      )
    })
  )

  return (
    <svg className="map" viewBox="-180 -90 360 180">
      <g transform="scale(1 -1)">
        <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
      <MappedRoutes />    
      </g>
    </svg>
  )
}

export default RouteMap 