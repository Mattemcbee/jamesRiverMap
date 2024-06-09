import React, { useState } from 'react';
import { Tooltip } from 'react-leaflet';
import { Container, Row, Col, Button } from 'react-bootstrap';

const PolygonTooltip = ({ polygon, riverHeightCompare, onImageClick, onClose }) => {
  return (
    <Tooltip direction="bottom" offset={[0, 10]} permanent style={{ fontSize: '16px', padding: '10px' }}>
      <Container>
        <Button
          variant="danger"
          size="sm"
          style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}
          onClick={onClose}
        >
          Close
        </Button>
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
            style={{ width: '150px', height: '150px', cursor: 'pointer' }}
            onClick={() => onImageClick(polygon.image)}
          />
        </div>
      </Container>
    </Tooltip>
  );
};

export default PolygonTooltip;
