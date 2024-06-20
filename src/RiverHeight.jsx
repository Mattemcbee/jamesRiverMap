import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RiverHeight = ({ style }) => {
  const [riverHeight, setRiverHeight] = useState(null);
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
      } catch (err) {
        setError(err);
      }
    };

    fetchRiverHeight();
  }, []);

  return (
    <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '' }}>
      {error ? (
        <h1 style={{ color: 'red', margin: 0 }}>
          Error: {error.message}
        </h1>
      ) : riverHeight ? (
        <h1 style={{ fontSize: '10px', margin: 0 }}>
          River: {riverHeight} ft
        </h1>
      ) : (
        <h1 style={{ margin: 0 }}>Loading...</h1>
      )}
    </div>
  );
};

export default RiverHeight;
