"use client";
import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

const mapOptions = {
  mapId: process.env.NEXT_PUBLIC_MAP_ID,
  center: { lat: 47.61195, lng: -122.3386 },
  zoom: 14,
  disableDefaultUI: true,
  heading: 20,
  tilt: 25,
};

export default function Maps() {
  return (
    <div className="m-5">
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <MapComponent />
      </Wrapper>
    </div>
  );
}

function MapComponent() {
  const [map, setMap] = useState();
  const [featureLayer, setFeatureLayer] = useState();
  const [lat, setLat] = useState("47.61195");
  const [lng, setLng] = useState("-122.33860");
  const ref = useRef();
  const markerRef = useRef();

  useEffect(() => {
    const instance = new window.google.maps.Map(ref.current, mapOptions);
    setMap(instance);
    setFeatureLayer(instance.getFeatureLayer("LOCALITY"))
    markerRef.current = new window.google.maps.Marker({ map: instance });

  }, []);

  console.log(featureLayer);

  return <div ref={ref} className="min-h-screen m-5 rounded-lg">
    hello
    <div>
    {/* <iframe src="https://storage.googleapis.com/maps-solutions-hcbskjbeem/neighborhood-discovery/as9b/neighborhood-discovery.html"
  width="100%" height="100%"
//   style={{marginRight:  + 'em'}}
  loading="lazy">
</iframe> */}
    </div>
  </div>;
}
