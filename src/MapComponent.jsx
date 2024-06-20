import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Polyline,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import LocationUpdateControl from "./LocationUpdateControl";
import RiverHeight from "./RiverHeight.jsx";
import Navbar from "./Navbar"; // Import the Navbar component
import { Container, Row, Col } from "react-bootstrap";
import LocateControl from "./LocateControl";
import Polylines from "./Polylines"; // Import the Polylines component
import TrailNotes from "./TrailNotes.jsx";
import PolygonsMap from "./Polygons";

// Fix for missing marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapComponent = ({
  locations,
  trails,
  nudistRoute,
  locateUser,
  polygons,
  userLocation,
  setUserLocation,
  onImageClick,
  customRouteCoordinates,
  customRouteCoordinatesJump,
  customRouteCoords42,
  lyraIslandRoute,
  sandbarRoute,
  riverHeightCompare,
  sandbarRouteLeft,
  customPaintRoute,
  trailNotes,
  belleRockyPath,
  bellePicnicPath,
  ponyKayakRoute,
}) => {
  const [satelliteView, setSatelliteView] = useState(true); // Set satellite view as default
  const [map, setMap] = useState(null); // State to manage the map instance
  const [selectedPolygon, setSelectedPolygon] = useState(null); // State to manage the selected polygon

  const handleLocationSelect = (event) => {
    const selectedLabel = event.target.value;
    const polygon = polygons.find((polygon) => polygon.label === selectedLabel);
    if (polygon) {
      setSelectedPolygon(polygon);
      if (map) {
        map.setView(polygon.coords[0], 16); // Center the map on the selected polygon with zoom level 16
      }
    }
  };

  const handleViewTrail = () => {
    if (map && selectedPolygon) {
      map.setView(selectedPolygon.coords[0], 16); // Zoom level 16
    }
  };

  const defaultCenter = userLocation || [37.5339, -77.4848]; // Richmond, VA coordinates

  return (
    <MapContainer
      center={defaultCenter}
      zoom={userLocation ? 16 : 16}
      style={{ height: "100vh", width: "100%" }}
      whenCreated={(mapInstance) => setMap(mapInstance)} // Set the map instance to state
      zoomControl={false} // Disable zoom control
    >
      {/* Navbar */}
      <Navbar
        toggleSatelliteView={() => setSatelliteView(!satelliteView)}
        locateUser={locateUser}
        setUserLocation={setUserLocation}
        handleLocationSelect={handleLocationSelect}
        polygons={polygons}
        selectedPolygon={selectedPolygon} // Pass selectedPolygon to Navbar
      />
      {/* Tile layers */}
      {satelliteView ? (
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      ) : (
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
      )}

      {/* RiverHeight component */}
      <RiverHeight
        style={{
          position: "absolute",
          bottom: "90px",
          left: "10px",
          zIndex: 1000,
          backgroundColor: "#FFDBBB",
          border:'1px white solid',
          color: "black",
          padding: "6px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center", // Center vertically
          justifyContent: "center", // Center horizontally (optional)
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)", // Soften the shadow
        }}
      />

      {/* Markers */}
      {userLocation && <Marker position={userLocation}></Marker>}
      {/* TrailNotes */}
      <TrailNotes 
      trailNotes={trailNotes} 
      onImageClick={onImageClick}

      />
      {/* Polylines */}
      <Polylines
        nudistRoute={nudistRoute}
        customRouteCoordinates={customRouteCoordinates}
        customRouteCoordinatesJump={customRouteCoordinatesJump}
        customPaintRoute={customPaintRoute}
        sandbarRouteLeft={sandbarRouteLeft}
        customRouteCoords42={customRouteCoords42}
        sandbarRoute={sandbarRoute}
        lyraIslandRoute={lyraIslandRoute}
        belleRockyPath={belleRockyPath}
        bellePicnicPath={bellePicnicPath}
        ponyKayakRoute={ponyKayakRoute}

      />



      {/* PolygonsMap */}
      <PolygonsMap
        polygons={polygons}
        selectedPolygon={selectedPolygon}
        setSelectedPolygon={setSelectedPolygon} // Pass setSelectedPolygon to PolygonsMap
        riverHeightCompare={riverHeightCompare}
        onImageClick={onImageClick}
      />
    </MapContainer>
  );
};

export default MapComponent;
