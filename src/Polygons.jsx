import React from "react";
import { Polyline, Polygon, Popup, Tooltip } from "react-leaflet";
import { Container, Row, Col } from "react-bootstrap";

const PolygonsMap = ({ polygons, selectedPolygon, setSelectedPolygon, riverHeightCompare, onImageClick }) => {
  const handlePolygonClick = (polygon) => {
    setSelectedPolygon(polygon);
  };

  return (
    <>
      {polygons.map((polygon, idx) => (
        <Polygon
          key={idx}
          positions={polygon.coords}
          pathOptions={{
            color: selectedPolygon && selectedPolygon.label === polygon.label ? "#00FFFF" : polygon.color,
          }}
          eventHandlers={{
            click: () => handlePolygonClick(polygon),
          }}
        >
          {selectedPolygon && selectedPolygon.label === polygon.label && (
            <>
              <Tooltip
                direction="bottom"
                offset={[0, 10]}
                permanent
                style={{ fontSize: "40px", padding: "40px" }}
              >
                <Container style={{ padding: 0 }}>
                  <strong>{polygon.label}</strong>
                  <br />
                </Container>
              </Tooltip>
              {selectedPolygon.label !== "--Clear Screen--" && (
                <Container
                  fluid
                  style={{
                    position: "absolute",
                    bottom: "130px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1000,
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "300px",
                    width: "300px",
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={{ size: 7, offset: 1 }}>
                      <strong>{polygon.label}</strong>
                      <br />
                      {polygon.warning && (
                        <>
                          <i style={{ color: "#800000" }}>{polygon.warning}</i>
                          <br />
                        </>
                      )}
                      {polygon.lowEnd && <i>Accessibility: </i>}
                      {riverHeightCompare < polygon.lowEnd && <i style={{ color: "green" }}>Easy</i>}
                      {riverHeightCompare > polygon.lowEnd && riverHeightCompare < polygon.mediumEnd && (
                        <i style={{ color: "orange" }}>Little High</i>
                      )}
                      {riverHeightCompare > polygon.mediumEnd && <i style={{ color: "red" }}>Too High</i>}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(polygon.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        {polygon.address}
                      </a>
                    </Col>
                    <Col
                      xs="4"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingRight: 0,
                      }}
                    >
                      <img
                        src={polygon.image}
                        alt={polygon.label}
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          cursor: "pointer",
                          borderRadius: "0 50% 50% 0",
                        }}
                        onClick={() => onImageClick(polygon.image)}
                      />
                    </Col>
                  </Row>
                </Container>
              )}
            </>
          )}
        </Polygon>
      ))}
      {selectedPolygon && selectedPolygon.path && (
        <>
          <Polyline
            positions={selectedPolygon.path}
            pathOptions={{ color: "green", weight: 6, opacity: "90%" }}
          />
          <Polyline
            positions={selectedPolygon.path}
            pathOptions={{ color: "#90ee90", weight: 4 }}
          />
        </>
      )}
    </>
  );
};

export default PolygonsMap;
