import React, { useState, useEffect } from "react";
import LocationUpdateControl from "./LocationUpdateControl";
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
        top: "",
        left: "10px",
        zIndex: 1000,
        background: "#D4A056",
        border: "none",
        padding: '7.5px',
        cursor: "pointer",
        backgroundColor: '#D4A056',
        borderRadius: '5px',
        color: 'white'
      }}
    >
      Current Location
    </button>
  );
};

const Navbar = ({
  toggleSatelliteView,
  locateUser,
  setUserLocation,
  handleLocationSelect,
  polygons
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const map = useMap();

  const handleDropdownChange = (event) => {
    const selectedLabel = event.target.value;
    if (selectedLabel === "Clear") {
      setSelected(false);
    } else {
      const selectedPolygon = polygons.find(
        (polygon) => polygon.label === selectedLabel
      );
      if (selectedPolygon) {
        handleLocationSelect(event);
        setSelected(true);
        map.setView(selectedPolygon.coords[0], 16);
      }
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      setDropdownVisible(true);
    } else {
      const timer = setTimeout(() => setDropdownVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [dropdownOpen]);

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "0px",
        zIndex: 1001, // Ensure Navbar appears on top of the map
        backgroundColor: "",
        borderRadius: "5px",
        padding: "10px",
      }}
    >
      {/* Dropdown button */}
      <div>
        <button
          style={{
            marginBottom: '10px',
            backgroundColor: '#D4A056',
            color: 'WHITE',
            border: '2px solid #D4A056',
            borderRadius: '5px',
            width: '50px',
            height: '40px',
            fontSize: 'x-large',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)', // Soften the shadow
          }}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          =
        </button>
        {/* Dropdown menu */}
        <div
          style={{
            maxHeight: dropdownOpen ? '200px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
            opacity: dropdownOpen ? 1 : 0,
            visibility: dropdownOpen || dropdownVisible ? 'visible' : 'hidden',
          }}
        >
          <div style={{  transition: 'padding 0.3s ease-in-out' }}>
            <LocateControl setUserLocation={setUserLocation} />
            <br/>
            {/* Toggle Satellite View button */}
            <button 
              style={{
                color: 'white',
                backgroundColor: '#D4A056',
                marginTop: '20px',
                marginBottom: '5px',
                border: 'none',
                borderRadius: '5px',
                padding: '7.5px',
                boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)', // Soften the shadow
              }} 
              onClick={toggleSatelliteView}
            >
              Toggle Satellite View
            </button>
            <br />
            <LocationUpdateControl 
              style={{
                color: 'white',
                backgroundColor: '#D4A056',
                marginBottom: '',
                border: 'none',
                borderRadius: '5px',
                padding: '5px',
                boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)', // Soften the shadow
              }}  
              setUserLocation={setUserLocation} 
            />
            {/* Location select dropdown */}
            <select 
              style={{
                color: 'white',
                backgroundColor: '#D4A056',
                marginBottom: '5px',
                border: 'none',
                borderRadius: '5px',
                padding: '7.5px',
                marginTop: '5px',
                boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)', // Soften the shadow
              }}  
              onChange={handleDropdownChange}
            >
              <option value="">Select a location</option>
              {polygons.map((polygon) => (
                <option key={polygon.label} value={polygon.label}>
                  {polygon.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
