'use client'

import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet'
import '@elfalem/leaflet-curve'
import { useEffect } from "react";


declare module 'leaflet' {
  function curve(path: Array<string | L.LatLngTuple>, options?: L.PathOptions): L.Curve
}

// const locations = [
//     { name: "United States", coords: [37.090240, -95.712891], iconUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/flags/flag-2.svg` },
//     { name: "Canada", coords: [56.130367, -106.346771], iconUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/flags/flag-1.svg` },
//     { name: "United Kingdom", coords: [52.355518, -1.174320], iconUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/flags/flag-4.svg` },
//     { name: "South Africa", coords: [-30.559483, 22.937506], iconUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/flags/flag-8.svg` },
//     { name: "Japan", coords: [36.204823,138.252930], iconUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/flags/flag-7.svg` },
//     { name: "Australia", coords: [-25.274399,133.775131], iconUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/flags/flag-6.svg` },
//     { name: "Mexico", coords: [23.634501,-102.552788], iconUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/flags/flag-5.svg` },
//     { name: "Brazil", coords: [-14.235004,-51.925282], iconUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/flags/flag-3.svg` }
// ];

type locations = { name: { en: string, fr: string }, coords: number[], iconUrl: string }[]

const center: L.LatLngTuple = [20, 0];

const CurveConnection = ({ start, end }: { start: L.LatLngTuple; end: L.LatLngTuple }) => {
  const map = useMap();

  const getControlPoint = (start: L.LatLngTuple, end: L.LatLngTuple): L.LatLngTuple => {
    const midLat = (start[0] + end[0]) / 2;
    const midLng = (start[1] + end[1]) / 2;
    return [midLat + (start[0] > end[0] ? 10 : -10), midLng];
  };

  useEffect(() => {
    const control = getControlPoint(start, end);

    const curvedLine = L.curve(
      [
        'M', start,
        'Q', control,
        end
      ],
      {
        color: '#6F93E1',
        weight: 2,
        opacity: 0.8
      }
    ).addTo(map);

    return () => {
      map.removeLayer(curvedLine);
    };
  }, [map, start, end]);

  return null;
};




export default function DynamicMap({ data }: { data: locations }) {
  return (
    <MapContainer
      center={center}
      zoom={2}
      className="!h-[35rem]"
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      <Marker position={center} icon={new L.Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      })}>
        {/* <Popup>Center Point</Popup> */}
      </Marker>

      {data.map((location, index) => (
        <div key={index}>
          <Marker
            position={location.coords as LatLngExpression}
            icon={new L.Icon({
              iconUrl: location.iconUrl,
              iconSize: [50, 50],
              iconAnchor: [25, 50]
            })}
          >
            {/* <Popup>{location.name}</Popup> */}
          </Marker>

          <CurveConnection
            start={location.coords as L.LatLngTuple}
            end={center}
          />
        </div>
      ))}
    </MapContainer>
  )
}