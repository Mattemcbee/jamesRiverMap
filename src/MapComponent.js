import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

// Fix for missing marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LocateControl = ({ setUserLocation }) => {
    const map = useMap();

    const handleLocationFound = (e) => {
        const { lat, lng } = e.latlng;
        setUserLocation([lat, lng]);
        map.setView([lat, lng], 24);  // Center the map on the new location
    };

    const locateUser = () => {
        map.locate({ setView: true, maxZoom: 16 });
    };

    useEffect(() => {
        map.on('locationfound', handleLocationFound);
        return () => {
            map.off('locationfound', handleLocationFound);
        };
    }, [map, setUserLocation]);

    return (
        <button
            onClick={locateUser}
            style={{
                position: 'absolute',
                top: '90px',
                left: '10px',
                zIndex: 1000,
                background: 'white',
                border: 'none',
                padding: '10px',
                cursor: 'pointer'
            }}
        >
            Current Location
        </button>
    );
};

const MapComponent = ({ locations, trails, polygons, userLocation, setUserLocation }) => {
    const [routeControl, setRouteControl] = useState(null);
    const [destination, setDestination] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleMapClick = (e) => {
        // Handle map clicks here
    };

    const handleRoute = () => {
        if (routeControl && userLocation && destination) {
            // Clear existing waypoints
            routeControl.setWaypoints([]);
            
            // Add waypoints for current location and destination
            const waypoints = [
                L.latLng(userLocation[0], userLocation[1]),
                L.latLng(destination[0], destination[1])
            ];
            routeControl.setWaypoints(waypoints);
        }
    };
    
    

    useEffect(() => {
        console.log('Destination updated:', destination);
        if (routeControl && userLocation && destination) {
            handleRoute();
        }
    }, [routeControl, userLocation, destination]);

    const handleLocationSelect = (event) => {
        const selectedLocation = event.target.value;
        const location = locations.find(loc => loc.label === selectedLocation);
        if (location) {
            setDestination(location.coords);
        }
    };

    const defaultCenter = userLocation ? userLocation : [37.5407, -77.4360]; // Richmond, VA coordinates

    return (
        <MapContainer center={defaultCenter} zoom={userLocation ? 13 : 11} style={{ height: '100vh', width: '100%' }} onClick={handleMapClick}>

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocateControl setUserLocation={setUserLocation} />
            <select onChange={handleLocationSelect} style={{
                position: 'absolute',
                top: '140px',
                left: '10px',
                zIndex: 1000,
                background: 'white',
                border: 'none',
                padding: '10px',
                cursor: 'pointer'
            }}>
                <option value="">Select a location</option>
                {locations.map(location => (
                    <option key={location.label} value={location.label}>{location.label}</option>
                ))}
            </select>
            {userLocation && (
                <Marker position={userLocation}>
                    <Popup>You are here</Popup>
                </Marker>
            )}
            {polygons.map((polygon, idx) => (
                <Polygon key={idx} positions={polygon.coords} pathOptions={{ color: polygon.color }}>
                    <Popup>{polygon.label}                    
                    </Popup>
                </Polygon>
            ))}
            <RoutingControl setRouteControl={setRouteControl} />
            
            {trails && trails.map((trail, idx) => (
                <Polyline key={idx} positions={trail.path} pathOptions={{ color: 'green' }} />
            ))}
        </MapContainer>
    );
};

const RoutingControl = ({ setRouteControl }) => {
    const map = useMap();

    useEffect(() => {
        const routeControl = L.Routing.control({
            waypoints: [],
            router: new L.Routing.osrmv1({
                serviceUrl: 'http://router.project-osrm.org/route/v1',
            }),
            show: false // Ensure the textual directions are not displayed
        }).addTo(map);
        setRouteControl(routeControl);

        // Hide the entire route instructions container
        const routeInstructionsContainer = document.querySelector('.leaflet-routing-container');
        if (routeInstructionsContainer) {
            routeInstructionsContainer.style.display = 'none';
        }

        return () => {
            map.removeControl(routeControl);
        };
    }, [map, setRouteControl]);

    return null;
};

export default MapComponent;
