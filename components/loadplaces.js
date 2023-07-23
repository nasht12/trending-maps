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

export default function LoadPlaces() {
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
  const [data, setData] = useState();
  const ref = useRef();
  const markerRef = useRef();
  const overlayRef = useRef();


  useEffect(() => {
    const instance = new window.google.maps.Map(ref.current, mapOptions);
    setMap(instance);
    markerRef.current = new window.google.maps.Marker({ map: instance });
    const autocompleteService = new google.maps.places.AutocompleteService();

    autocompleteService.getQueryPredictions({ input: "seattle", types: ['(regions)'] }, (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // Filter and extract the neighborhoods from the predictions
          const neighborhoods = predictions.map(prediction => prediction.description);
  
          console.log('Neighborhoods in seattle', ':', neighborhoods);
        } else {
          console.error('Error fetching data:', status);
        }
      });
    setData(autocompleteService)
  }, []);

//   console.log('autocompleteService', data);

  return (
    <div>
      <div ref={ref} className="min-h-screen rounded-lg"></div>
    </div>
  );
}


