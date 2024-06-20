import React from "react";
import { Polyline, Polygon, Popup } from "react-leaflet";
import { Container } from "react-bootstrap";
import './PopupStyles.css'; // Import the CSS file

const TrailNotes = ({ trailNotes, selectedPolygon, onImageClick }) => {
  return (
    <>
      {trailNotes.map((polygon, idx) => (
        <Polygon
          key={idx}
          positions={polygon.coords}
          pathOptions={{
            dashArray: "5, 4",
            dashOffset: "",
            color:
              selectedPolygon && selectedPolygon.label === polygon.label
                ? "#00FFFF"
                : polygon.color,
          }}
        >
          <Popup closeButton={false}>
            <div style={{ padding: "0", margin: "0" }} className='text-center'>
              <strong>{polygon.label}</strong> <br />

              <Container
                fluid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0",
                  width: '100%',
                  backgroundColor: '',
                  margin: '0',
                  color: 'white', // Ensure text is readable on green background
                }}
              >
                <img
                  src={polygon.image}
                  alt={polygon.label}
                  style={{ width: "100px", cursor: "pointer", borderRadius:'0 0 10px 10px' }}
                  onClick={() => onImageClick(polygon.image)}
                />
              </Container>
            </div>
          </Popup>
        </Polygon>
      ))}
    </>
  );
};

export default TrailNotes;
