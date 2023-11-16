import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon, divIcon, point } from 'leaflet';

import airplaneIcon from '../../assets/airplane.svg';
import vesselIcon from '../../assets/vessel.svg';

const shipIcon = new Icon({
  iconUrl: vesselIcon,
  iconSize: [20, 20]
});

const aircraftIcon = new Icon({
  // iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconUrl: airplaneIcon,
  iconSize: [20, 20]
});

const createVesselsClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="vessels-cluster-icon">${cluster.getChildCount()}</span>`,
    className: 'vessels-custom-marker-cluster',
    iconSize: point(33, 33, true)
  });
};

const createAircraftClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="aircraft-cluster-icon">${cluster.getChildCount()}</span>`,
    className: 'aircraft-custom-marker-cluster',
    iconSize: point(33, 33, true)
  });
};

export default function Map() {
  const [vessels, setVessels] = useState([]);
  const [aircraft, setAircraft] = useState([]);

  useEffect(() => {
    // Fetch vessels data from API
    const fetchVesselsData = async () => {
      try {
        const response = await fetch('https://64ce12380c01d81da3ee7d79.mockapi.io/vessels');
        const data = await response.json();
        setVessels(data);
      } catch (error) {
        console.error('Error fetching vessels data:', error);
      }
    };

    // Fetch aircraft data from API
    const fetchAircraftData = async () => {
      try {
        const response = await fetch('https://64ce12380c01d81da3ee7d79.mockapi.io/aircraft');
        const data = await response.json();
        setAircraft(data);
      } catch (error) {
        console.error('Error fetching aircraft data:', error);
      }
    };

    // Call both API fetch functions
    fetchVesselsData();
    fetchAircraftData();
  }, []);

  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={5}>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {/* Vessels markers */}
      <MarkerClusterGroup chunkedLoading iconCreateFunction={createVesselsClusterCustomIcon}>
        {vessels.map((marker, index) => (
          <Marker
            key={`vessel-${index}`}
            position={[marker.latitude, marker.longitude]}
            icon={shipIcon}
          >
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      {/* Aircraft markers */}
      <MarkerClusterGroup chunkedLoading iconCreateFunction={createAircraftClusterCustomIcon}>
        {aircraft.map((marker, index) => (
          <Marker
            key={`aircraft-${index}`}
            position={[marker.latitude, marker.longitude]}
            icon={aircraftIcon}
          >
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
