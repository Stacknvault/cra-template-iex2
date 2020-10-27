import React from "react";
import styled from "@emotion/styled";

import { Map, TileLayer, Marker } from "react-leaflet";

const MapContainer = styled(Map)`
  width: 100%;
  height: 400px;
`;

export default function OpenMap({position, zoom}) {


  return (
    <MapContainer center={position} zoom={zoom}>
      <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <Marker position={position}></Marker>
    </MapContainer>
  );
}
