"use client";
import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import NeighborhoodsInCity from "@/components/neighborhoods";
import LoadPlaces from "@/components/loadplaces";

const City = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading ...</div>;

  return (
    <div>
       <NeighborhoodsInCity />;
    <LoadPlaces />
    </div>
  )
};

export default City;
