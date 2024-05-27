import React, { useState } from 'react';
import MapComponent from './MapComponent';

const App = () => {
  const locations = [
    {
      coords: [37.5382, -77.4928],
      label: 'Rosie'
    },
    {
      coords: [37.53375, -77.4858],

      label: 'Lyra Island'
    },
    {
      coords:         [37.531833, -77.4792],

      label: 'Nudist'
    },
    {
      coords:        [37.531833, -77.4802],


      label: 'Himanish Rock'
    },{
      coords:        [37.53778, -77.49228],

      label: 'Goose Poop Rock '
    },
    {
      coords:         [37.53018, -77.47452],


      label: 'Sandbar '
    },

  ];

  const polygons = [
    {
      coords: [
        [37.53375, -77.4858],
        [37.53375, -77.4862],
        [37.534, -77.4862],
        [37.534, -77.4858],
      ],
      color: 'red',
      label: 'Lyra Island'
    },
    {
      coords: [
        [37.531833, -77.4792],
        [37.531833, -77.4798],
        [37.5320999, -77.4798],
        [37.5320999, -77.4792],
      ],
      color: 'blue',
      label: 'Nudist rock'
    },
    {
      coords: [
        [37.531833, -77.4802],
        [37.531833, -77.4808],
        [37.5320999, -77.4808],
        [37.5320999, -77.4802],
      ],
      color: 'blue',
      label: 'Himanish Rock'
    },
    {
      coords: [
        [37.53778, -77.49228],
        [37.53778, -77.49248],
        [37.53758, -77.49248],
        [37.53758, -77.49228],

      ],
      color: 'blue',
      label: 'goose poop rock '
    },
    {
      coords: [
        [37.5298, -77.47452],
        [37.5298, -77.47502],
        [37.53018, -77.47502],
        [37.53018, -77.47452],

      ],
      color: 'blue',
      label: 'sandbar '
    },
    {
      coords: [
        [37.5386, -77.4928],
        [37.5386, -77.4932],
        [37.5388, -77.4932],
        [37.5388, -77.4928],

      ],
      color: 'blue',
      label: 'Rosie Proposal '
    },

  ];

  const [userLocation, setUserLocation] = useState(null);

  return (
    <div style={{backgroundColor:'transparent'}}>
      <MapComponent locations={locations} polygons={polygons} userLocation={userLocation} setUserLocation={setUserLocation} />
    </div>
  );
};

export default App;
