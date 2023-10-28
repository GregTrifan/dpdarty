/* eslint-disable @next/next/no-img-element */
import React from "react";
import Map from "../components/Map";

const MapPage = () => {
  return (
    <div className="mx-auto max-w-xl lg:max-w-6xl">
      <h1 className="text-4xl absolute top-4 text-white mr-52">Map</h1>
      <Map address="1600 Amphitheatre Parkway, Mountain View, CA" />
      <Map address="Daszynskiego 19, 31-537 Krakow, Poland" />
    </div>
  );
};

export default MapPage;
