import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent.jsx";
import ModalComponent from "./ModalComponent.jsx";
import { customRouteCoords, customRouteCoordsJump,customPaintRoute, customRouteCoords42, polygons, nudistRoute,lyraIslandRoute,sandbarRoute,sandbarRouteLeft } from "./coordinates_list.js";
import axios from 'axios';

const App = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [riverHeightCompare, setRiverHeight] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRiverHeight = async () => {
      try {
        const response = await axios.get('https://waterservices.usgs.gov/nwis/iv/', {
          params: {
            format: 'json',
            sites: '02037500', // Station ID for the specified location
            parameterCd: '00065', // Parameter code for gage height
            siteStatus: 'active',
          },
        });
        const height = response.data.value.timeSeries[0].values[0].value[0].value;
        setRiverHeight(height);
        console.log('compare',riverHeightCompare)
      } catch (err) {
        setError(err);
      }
    };

    fetchRiverHeight();
  }, []);
  const handleImageClick = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <MapComponent 
        polygons={polygons} 
        userLocation={userLocation} 
        setUserLocation={setUserLocation}
        onImageClick={handleImageClick} 
        customRouteCoordinates={customRouteCoords}
        customRouteCoordinatesJump={customRouteCoordsJump}
        customRouteCoords42={customRouteCoords42}
        lyraIslandRoute={lyraIslandRoute}
        nudistRoute={nudistRoute}
        sandbarRoute={sandbarRoute}
        riverHeightCompare={riverHeightCompare}
        sandbarRouteLeft={sandbarRouteLeft}
        customPaintRoute={customPaintRoute}
      />
      <ModalComponent show={showModal} onClose={handleCloseModal} image={modalImage} />
    </div>
  );
};

export default App;
