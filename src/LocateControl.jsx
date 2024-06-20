// LocateControl.jsx
import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

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
        backgroundColor: "white",
        borderRadius: "5px",
        color: "black",
      }}
    >
      Current Location
    </button>
  );
};

export default LocateControl;
