import "leaflet/dist/leaflet.css";
import {
  Circle,
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import { demandZones } from "../data/caseStudy";
import type { CandidateSite } from "../types";

interface NetworkMapProps {
  sites: CandidateSite[];
}

export function NetworkMap({ sites }: NetworkMapProps) {
  return (
    <section className="map-panel" id="network" aria-label="Recommended charging network map">
      <div className="map-legend">
        <span>
          <i className="legend-dot existing" /> Existing
        </span>
        <span>
          <i className="legend-dot recommended" /> Recommended
        </span>
        <span>
          <i className="legend-ring" /> Demand zone
        </span>
      </div>
      <MapContainer
        center={[35.84, -78.74]}
        zoom={10}
        minZoom={9}
        maxZoom={14}
        zoomControl={false}
        scrollWheelZoom={false}
        className="network-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />

        {demandZones.map((zone) => (
          <Circle
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={zone.weight * 260}
            pathOptions={{
              color: "#3ca4bd",
              fillColor: "#56b9ce",
              fillOpacity: 0.08,
              opacity: 0.42,
              weight: 1,
            }}
          />
        ))}

        {sites.map((site) => (
          <CircleMarker
            key={site.id}
            center={[site.lat, site.lng]}
            radius={8}
            pathOptions={{
              color: "#ffffff",
              weight: 3,
              fillColor: "#b5e51d",
              fillOpacity: 1,
            }}
          >
            <Tooltip direction="top" offset={[0, -7]}>
              {site.name}
            </Tooltip>
            <Popup>
              <strong>{site.name}</strong>
              <br />
              Phase {site.phase} · {site.addedPorts} ports
              <br />
              Grid upgrade: {site.gridUpgrade}
            </Popup>
          </CircleMarker>
        ))}

        {[
          [35.994, -78.899],
          [35.779, -78.639],
          [35.791, -78.781],
          [35.913, -79.055],
          [35.721, -78.658],
        ].map(([lat, lng], index) => (
          <CircleMarker
            key={`${lat}-${lng}`}
            center={[lat, lng]}
            radius={4.5}
            pathOptions={{
              color: "#ffffff",
              weight: 1.5,
              fillColor: "#0b2b5b",
              fillOpacity: 1,
            }}
          >
            {index === 0 && <Tooltip direction="top">Existing DC fast charger</Tooltip>}
          </CircleMarker>
        ))}
      </MapContainer>
    </section>
  );
}
