import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const CustomTooltip = ({ position, children }) => {
  const map = useMap();
  const tooltipContainer = document.createElement('div');

  useEffect(() => {
    if (map) {
      const tooltip = L.tooltip({
        permanent: true,
        direction: 'right',
        offset: L.point(10, 0),
      }).setContent(tooltipContainer).setLatLng(position).addTo(map);

      return () => {
        map.removeLayer(tooltip);
      };
    }
  }, [map, position, tooltipContainer]);

  return createPortal(
    <div style={{ fontSize: '40px', padding: '40px' }}>
      {children}
    </div>,
    tooltipContainer
  );
};

export default CustomTooltip;
