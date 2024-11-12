import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // puor faire la carte , source https://react-leaflet.js.org/
import 'leaflet/dist/leaflet.css';
import { fetchCoordinates } from '../services/LocationService';

function MapWithAddress({ address }) {
  const [coordinates, setCoordinates] = useState("");

  useEffect(() => {
    async function getCoordinates() {
      if (address) {
        const coords = await fetchCoordinates(address);
        setCoordinates(coords);
      }
      else {
        console.error("adresse vide")
      }
    }

    getCoordinates();
  }, []);

  // composant carte , source : https://react-leaflet.js.org/docs/example-popup-marker/
  return coordinates ? (
    <MapContainer center={[coordinates.lat, coordinates.lon]} zoom={15} style={{ height: "200px", width: "300px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[coordinates.lat, coordinates.lon]}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  ) : (
    <p>Chargement...</p>
  );
}

export default MapWithAddress;
