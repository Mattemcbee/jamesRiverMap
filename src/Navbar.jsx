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
        background: "white",
        border: "none",
        padding: '7.5px',
        cursor: "pointer",
        backgroundColor: 'white',
        borderRadius:'5px',
        marginBottom:'10px',
        color:'black'
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
  polygons,
}) => {
  // State to manage the dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // State to store the selected location from the dropdown
  const [selected, setSelected] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Function to handle changes in the dropdown selection
  const handleDropdownChange = (event) => {
    handleLocationSelect(event);
    setSelected(event.target.value !== "");
  };

  // Effect to manage the visibility of the dropdown menu
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
            backgroundColor: dropdownOpen ? '#ffd5bb' : '#ffb76d',
            color: 'white',
            border: dropdownOpen ? '2px solid #ffd5bb' : '2px solid #ffb76d',
            borderRadius: '5px',
            padding: '8px',
            width: '',
            height: '',
            fontSize: 'medium',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: dropdownOpen ? '2px 2px 10px rgba(0, 0, 0, 0.3)' : '2px 2px 10px rgba(0, 0, 0, 0.2)', // Soften the shadow
          }}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          MENU
        </button>
        {/* Dropdown menu */}
        <div
          style={{
            maxHeight: dropdownOpen ? '200px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease-in-out,  0.3s ease-in-out',
            visibility: dropdownOpen ? 'visible' : 'hidden',
          }}
        >
          <>
            {/* LocateControl for current location */}
            <LocateControl setUserLocation={setUserLocation} />

            {/* Toggle Satellite View button */}
            <button
              style={{
                color: 'black',
                backgroundColor: 'white',
                marginBottom: '5px',
                border: 'none',
                borderRadius: '5px',
                marginTop:'38px',
                padding: '7.5px',
                boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)', // Soften the shadow
              }}
              onClick={() => {
                toggleSatelliteView();
                // If you want to center the map after toggling satellite view, add the following line:
                // map.setView(map.getCenter(), map.getZoom());
              }}
            >
              Toggle Satellite View
            </button>

            {/* Location Update Control */}
            <LocationUpdateControl setUserLocation={setUserLocation} />

            {/* Location select dropdown */}
            <select
              style={{
                color: 'black',
                backgroundColor: 'white',
                marginBottom: '5px',
                border: 'none',
                borderRadius: '5px',
                padding: '7.5px',
                marginTop: '5px',
                boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)', // Soften the shadow
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
          </>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

