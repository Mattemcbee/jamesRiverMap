import React, { useEffect, useState } from "react";

const LocationUpdateControl = ({ setUserLocation }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const startUpdatingLocation = () => {
    setIsUpdating(true);
  };

  const stopUpdatingLocation = () => {
    setIsUpdating(false);
  };

  useEffect(() => {
    let intervalId;

    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    };

    if (isUpdating) {
      updateLocation(); // Get initial location immediately
      intervalId = setInterval(updateLocation, 5000); // Update location every 10 seconds
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isUpdating, setUserLocation]);

  return (
    <div style={{ left: "10px", zIndex: 1000 }} >
      {isUpdating ? (
        <button onClick={stopUpdatingLocation} style={{
          backgroundColor: '#D4A056',
          borderRadius: '5px',
          padding:'7.5px',
          boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)', 
          border: '#D4A056',
          color: 'white'

        }}>Stop Location Updates</button>
      ) : (
        <button onClick={startUpdatingLocation} style={{
          backgroundColor: '#D4A056',
          borderRadius: '5px',
          padding:'7.5px',
          boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)', 
          border: '#D4A056',
          color: 'white'
        }}>Start Location Updates</button>
      )}
    </div>
  );
};

export default LocationUpdateControl;
