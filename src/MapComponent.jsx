import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
  Polyline,
  Tooltip
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import LocationUpdateControl from "./LocationUpdateControl";
import RiverHeight from './RiverHeight.jsx'
import Navbar from "./Navbar"; // Import the Navbar component
import {Container} from 'react-bootstrap'


// Fix for missing marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const LocateControl = ({ setUserLocation }) => {
  const map = useMap();

  const handleLocationFound = (e) => {
    const { lat, lng } = e.latlng;
    setUserLocation([lat, lng]);
    map.setView([lat, lng], 24); // Center the map on the new location
  };
  

  const locateUser = () => {
    map.locate({ setView: true, maxZoom: 16 });
  };

  useEffect(() => {
    map.on("locationfound", handleLocationFound);
    return () => {
      map.off("locationfound", handleLocationFound);
    };
  }, [map, setUserLocation]);

  return (
    <button
      onClick={locateUser}
      style={{
        position: "absolute",
        top: "250px",
        left: "10px",
        zIndex: 1000,
        background: "white",
        border: "none",
        padding: "5px",
        cursor: "pointer",
        backgroundColor: 'white',
        borderRadius:'5px',
        color:'black'


      }}
    >
      Current Location
    </button>
  );
   

};

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
  customPaintRoute
}) => {
  const [routeControl, setRouteControl] = useState(null);
  const [satelliteView, setSatelliteView] = useState(true); // Set satellite view as default
  const [map, setMap] = useState(null); // State to manage the map instance
  const [selectedPolygon, setSelectedPolygon] = useState(null); // State to manage the selected polygon

  const handleRoute = () => {
    if (routeControl && userLocation && selectedPolygon) {
      routeControl.setWaypoints([
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(selectedPolygon.coords[0][0], selectedPolygon.coords[0][1]),
      ]);
    }
  };

  useEffect(() => {
    if (routeControl && userLocation && selectedPolygon) {
      handleRoute();
    }
  }, [routeControl, userLocation, selectedPolygon]);

  const handleLocationSelect = (event) => {
    const selectedLabel = event.target.value;
    const polygon = polygons.find((polygon) => polygon.label === selectedLabel);
    if (polygon) {
      setSelectedPolygon(polygon);
      //map.setView(polygorn.coords[0], 16); // Center the map on the selected polygon with zoom level 16

    }
  };

  const handleViewTrail = () => {
    console.log("View Trail button clicked");
    console.log("Selected Polygon:", selectedPolygon); // Check the selected polygon
    console.log("map:", map); // Check the map instance

    // Check if both map and selectedPolygon are defined
    if (map && selectedPolygon) {
      console.log("Setting view to:", selectedPolygon.coords[0]); // Log the coordinates being set
      map.setView(selectedPolygon.coords[0], 16); // Zoom level 16
    } else {
      console.log("Map instance or selectedPolygon is not defined.");
    }
  };

  const defaultCenter = userLocation || [37.5339, -77.4848]; // Richmond, VA coordinates

  return (

    <MapContainer
      center={defaultCenter}
      zoom={userLocation ? 16 : 16}
      style={{ height: "100vh", width: "100%",position: ""  }}
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

      {/* Locate control 
<LocateControl setUserLocation={setUserLocation} />

      {/* Toggle satellite view button 
      
      <button
        onClick={() => setSatelliteView(!satelliteView)}
        style={{
          position: "absolute",
          top: "80px",
          left: "10px",
          zIndex: 1000,
          backgroundColor: 'white',
          borderRadius:'5px',
          border:'#FFDBBB',
          padding:'2.5px',

          color:'black'

        }}
      >
        Toggle Satellite View
      </button>
      */}

      {/* Location select dropdown
      <select
        onChange={handleLocationSelect}
        style={{
          position: "absolute",
          top: "110px",
          left: "10px",
          zIndex: 1000,
           backgroundColor: 'white',
        borderRadius:'5px',
        border:'#FFDBBB',
        color:'black',
        padding:'2.5px',


        }}

      >
        <option value="" >Select a location</option>
        {polygons.map((polygon) => (
          <option  key={polygon.label} value={polygon.label}>
            {polygon.label}
          </option>
        ))}
      </select>``
       */}
      {/* RiverHeight component */}
      <RiverHeight
  style={{
    position: 'absolute',
    bottom: '90px',
    left: '10px',
    zIndex: 1000,
    backgroundColor: '#FFDBBB',
    color: 'black',
    padding: '6px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center', // Center vertically
    justifyContent: 'center', // Center horizontally (optional)
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)' // Soften the shadow

  }}
/>


      {/* Markers */}
      {userLocation && <Marker position={userLocation}></Marker>}
      {nudistRoute && nudistRoute.length > 0 && (
        <Polyline
          positions={nudistRoute}
          pathOptions={{ color: "#0082cb", dashArray: '10, 20', dashOffset: '20' }}
        />
      )}
      {/* Custom routes */}
      {customRouteCoordinates && customRouteCoordinates.length > 0 && (
        <Polyline
          positions={customRouteCoordinates}
          pathOptions={{ color: "#BF40BF" }}
        />
      )}
      {customRouteCoordinatesJump && customRouteCoordinatesJump.length > 0 && (
        <Polyline
          positions={customRouteCoordinatesJump}
          pathOptions={{ color: "#BF40BF" }}
        />
      )}
      {customPaintRoute && customPaintRoute.length > 0 && (
        <Polyline
          positions={customPaintRoute}
          pathOptions={{ color: "#BF40BF" }}
        />
      )}
      
      {sandbarRouteLeft && sandbarRouteLeft.length > 0 && (
        <Polyline
          positions={sandbarRouteLeft}
          pathOptions={{ color: "#0082cb", dashArray: '10, 20', dashOffset: '20' }}
        />
      )}

      {customRouteCoords42 && customRouteCoords42.length > 0 && (
        <Polyline
          positions={customRouteCoords42}
          pathOptions={{ color: "#BF40BF" }}
        />
      )}
      {/* Polygons */}
      {polygons.map((polygon, idx) => (
        <>
        <Polygon
          key={idx}
          positions={polygon.coords}
          pathOptions={{
            color: selectedPolygon && selectedPolygon.label === polygon.label ? "#00FFFF" : polygon.color
          }}
        >
          {/* start here */}
          {selectedPolygon && selectedPolygon.label === polygon.label && (
           <>
           <Tooltip direction="bottom" offset={[0, 10]} permanent style={{ fontSize: '40px', padding:'40px' }}>
            <Container style={{padding:0 }}>
            <strong>{polygon.label}</strong> <br />
            {polygon.warning && (
              <>
                <i>{polygon.warning}</i> <br />
              </>
            )}
            {polygon.lowEnd && (
              <>
            <i>Accessibility: </i>
              </>
            )}

            {riverHeightCompare < polygon.lowEnd && (
              <i style={{ color: 'green' }}>Easy</i>
            )}
            {riverHeightCompare > polygon.lowEnd && riverHeightCompare < polygon.mediumEnd && (
              <i style={{ color: 'orange' }}>Little High</i>
            )}
            {riverHeightCompare > polygon.mediumEnd && (
              <i style={{ color: 'red' }}>Too High</i>
            )}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(polygon.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "" }}
            >
              {polygon.address}
            </a>
            {/*
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={polygon.image}
                alt={polygon.label}
                style={{ width: '150px', height: '150px', cursor: 'pointer', }}
                onClick={() => onImageClick(polygon.image)}
              />
            </div>
            */}
            </Container>
            </Tooltip>
            <Container style={{width:''}} >
            <strong>{polygon.label}</strong> <br />
            {polygon.warning && (
              <>
                <i>{polygon.warning}</i> <br />
              </>
            )}
            {polygon.lowEnd && (
              <>
            <i>Accessibility: </i>
              </>
            )}

            {riverHeightCompare < polygon.lowEnd && (
              <i style={{ color: 'green' }}>Easy</i>
            )}
            {riverHeightCompare > polygon.lowEnd && riverHeightCompare < polygon.mediumEnd && (
              <i style={{ color: 'orange' }}>Little High</i>
            )}
            {riverHeightCompare > polygon.mediumEnd && (
              <i style={{ color: 'red' }}>Too High</i>
            )}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(polygon.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "" }}
            >
              {polygon.address}
            </a>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={polygon.image}
                alt={polygon.label}
                style={{ width: '150px', height: '150px', cursor: 'pointer', }}
                onClick={() => onImageClick(polygon.image)}
              />
            </div>
          </Container>
            </>
          )}
          <Popup style={{width:'', padding:'', backgroundColor:''}} >
            <strong>{polygon.label}</strong> <br />
            {polygon.warning && (
              <>
                <i>{polygon.warning}</i> <br />
              </>
            )}
            {polygon.lowEnd && (
              <>
            <i>Accessibility: </i>
              </>
            )}

            {riverHeightCompare < polygon.lowEnd && (
              <i style={{ color: 'green' }}>Easy</i>
            )}
            {riverHeightCompare > polygon.lowEnd && riverHeightCompare < polygon.mediumEnd && (
              <i style={{ color: 'orange' }}>Little High</i>
            )}
            {riverHeightCompare > polygon.mediumEnd && (
              <i style={{ color: 'red' }}>Too High</i>
            )}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(polygon.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "" }}
            >
              {polygon.address}
            </a>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={polygon.image}
                alt={polygon.label}
                style={{ width: '150px', height: '150px', cursor: 'pointer', }}
                onClick={() => onImageClick(polygon.image)}
              />
            </div>

      {/*   here */}
          </Popup>
        </Polygon>
        {selectedPolygon && selectedPolygon.path && selectedPolygon.path === polygon.path && (
      <Polyline
        positions={polygon.path}
        pathOptions={{ color: "green", weight: 5 }}
      />
      
    )}
  </>

      ))}

      {/* Trails */}
      {trails &&
        trails.map(
          (trail, idx) =>
            trail.path && (
              <Polyline
                key={idx}
                positions={trail.path}
                pathOptions={{ color: "green" }}
              />
            )
        )}

      {/* Routing control */}





      {lyraIslandRoute && lyraIslandRoute.length > 0 && (
        <Polyline
          positions={lyraIslandRoute}
          pathOptions={{ color: "#0082cb", dashArray: '10, 20', dashOffset: '20' }}
        />
      )}
      {sandbarRoute && sandbarRoute.length > 0 && (
        <Polyline
          positions={sandbarRoute}
          pathOptions={{ color: "#0082cb", dashArray: '10, 20', dashOffset: '20' }}
        />
      )}
      {/*
      <LocationUpdateControl setUserLocation={setUserLocation} />
      
      <RiverHeight style={{backgroundColor:'', zIndex:'1000'}}/>
    */}
    </MapContainer>
  );
};

const RoutingControl = ({ setRouteControl }) => {
  const map = useMap();

  useEffect(() => {
    const routeControl = L.Routing.control({
      waypoints: [],

      router: new L.Routing.osrmv1({
        serviceUrl: "http://router.project-osrm.org/route/v1",
      }),
      show: false, // Ensure the textual directions are not displayed
    }).addTo(map);
    setRouteControl(routeControl);

    // Hide the entire route instructions container
    const routeInstructionsContainer = document.querySelector(
      ".leaflet-routing-container"
    );
    if (routeInstructionsContainer) {
      routeInstructionsContainer.style.display = "none";
    }

    return () => {
      map.removeControl(routeControl);
    };
  }, [map, setRouteControl]);

  return null;
};

export default MapComponent;
