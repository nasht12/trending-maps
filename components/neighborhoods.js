// export const Neighborhoods = {
//   downtown: {
//     lat: "47.61195",
//     lng: "-122.33860",
//     name: "Downtown",
//   },
//   ballard: {
//     lat: "47.66873",
//     lng: "-122.38217",
//     name: "Ballard",
//   },
//   greenlake: {
//     lat: "47.68587",
//     lng: "-122.33743",
//     name: "Greenlake",
//   },
//   freemont: {
//     lat: "47.65165",
//     lng: "-122.35175",
//     name: "Fremont",
//   },
//   caphill: {
//     lat: "47.61411",
//     lng: "-122.31691",
//     name: "Capitol Hill",
//   },
// };
"use client"

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, Circle, MarkerClusterer } from '@react-google-maps/api';



const NeighborhoodsInCity = () => {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const mapRef = useRef();

  const onLoad = useCallback((map)=> (mapRef.current = map), []);

  const center = useMemo(()=> ({lat: 43, lng: -80}), []);
  const options = useMemo(()=> ({disableDefaultUI:  true}), []);
  return (
    <div>
      <h2>Neighborhoods in Seattle:</h2>
      <div>
        <GoogleMap zoom={10} center={center} options={options} onLoad={onLoad} mapContainerClassName='min-w-full h-64'/>
      </div>
    </div>
  );
};

export default NeighborhoodsInCity;
