// Polylines.jsx
import React from "react";
import { Polyline } from "react-leaflet";

const Polylines = ({
  nudistRoute,
  customRouteCoordinates,
  customRouteCoordinatesJump,
  customPaintRoute,
  sandbarRouteLeft,
  customRouteCoords42,
  sandbarRoute,
  lyraIslandRoute,
  belleRockyPath,
  bellePicnicPath,
  ponyKayakRoute

}) => {
  return (
    <>
      {nudistRoute && nudistRoute.length > 0 && (
        <>
          <Polyline
            positions={nudistRoute}
            pathOptions={{
              color: "#BF40BF",
              dashArray: "10, 20",
              dashOffset: "20",
              weight: 4,
            }}
          />
          <Polyline
            positions={nudistRoute}
            pathOptions={{
              color: "#cd6dcd",
              dashArray: "10, 20",
              dashOffset: "20",
              weight: 2,
            }}
          />
        </>
      )}
      {customRouteCoordinates && customRouteCoordinates.length > 0 && (
        <>
          <Polyline
            positions={customRouteCoordinates}
            pathOptions={{ color: "#BF40BF", weight: 4, opacity: "" }}
          />
          <Polyline
            positions={customRouteCoordinates}
            pathOptions={{ color: "#ebc5eb", weight: 2 }}
          />
        </>
      )}
      {customRouteCoordinatesJump && customRouteCoordinatesJump.length > 0 && (
        <>
          <Polyline
            positions={customRouteCoordinatesJump}
            pathOptions={{ color: "#BF40BF", weight: 4, opacity: "" }}
          />
          <Polyline
            positions={customRouteCoordinatesJump}
            pathOptions={{ color: "#ebc5eb", weight: 2 }}
          />
        </>
      )}
      {customPaintRoute && customPaintRoute.length > 0 && (
        <>
          <Polyline
            positions={customPaintRoute}
            pathOptions={{ color: "#BF40BF", weight: 4, opacity: "" }}
          />
          <Polyline
            positions={customPaintRoute}
            pathOptions={{ color: "#ebc5eb", weight: 2 }}
          />
        </>
      )}
      {sandbarRouteLeft && sandbarRouteLeft.length > 0 && (
        <>
          <Polyline
            positions={sandbarRouteLeft}
            pathOptions={{
              color: "#BF40BF",
              dashArray: "10, 20",
              dashOffset: "20",
              weight: 4,
            }}
          />
          <Polyline
            positions={sandbarRouteLeft}
            pathOptions={{
              color: "#cd6dcd",
              dashArray: "10, 20",
              dashOffset: "20",
              weight: 2,
            }}
          />
        </>
      )}
      {belleRockyPath && belleRockyPath.length > 0 && (
      <>
        <Polyline
          positions={      belleRockyPath
}
          pathOptions={{ color: "#BF40BF", weight: 4, opacity: "" }}
        />
        <Polyline
          positions={      belleRockyPath
}
          pathOptions={{ color: "#ebc5eb", weight: 2 }}
        />
      </>
      )}
      {bellePicnicPath && bellePicnicPath.length > 0 && (
        <>
          <Polyline
            positions={      bellePicnicPath
      }
            pathOptions={{ color: "#BF40BF", weight: 4, opacity: "" }}
          />
          <Polyline
            positions={      bellePicnicPath
      }
            pathOptions={{ color: "#ebc5eb", weight: 2 }}
          />
        </>
        )}
      {customRouteCoords42 && customRouteCoords42.length > 0 && (
        <>
          <Polyline
            positions={customRouteCoords42}
            pathOptions={{ color: "#BF40BF", weight: 4, opacity: "" }}
          />
          <Polyline
            positions={customRouteCoords42}
            pathOptions={{ color: "#ebc5eb", weight: 2 }}
          />
        </>
      )}
      {/* Routing control */}
      
      {ponyKayakRoute && ponyKayakRoute.length > 0 && (
        <>
        <Polyline
          positions={ponyKayakRoute}
          pathOptions={{ color: "#BF40BF", weight: 4, opacity: "" }}
        />
        <Polyline
          positions={ponyKayakRoute}
          pathOptions={{ color: "#ebc5eb", weight: 2 }}
        />
      </>
      )}
      {lyraIslandRoute && lyraIslandRoute.length > 0 && (
        <>
          <Polyline
            positions={lyraIslandRoute}
            pathOptions={{
              color: "#BF40BF",
              dashArray: "7, 10",
              dashOffset: "20",
              weight: 4,
            }}
          />
          <Polyline
            positions={lyraIslandRoute}
            pathOptions={{
              color: "#cd6dcd",
              dashArray: "7, 10",
              dashOffset: "20",
              weight: 2,
            }}
          />
        </>
      )}
      {sandbarRoute && sandbarRoute.length > 0 && (
        <>
          <Polyline
            positions={sandbarRoute}
            pathOptions={{
              color: "#BF40BF",
              dashArray: "7, 10",
              dashOffset: "20",
              weight: 4,
            }}
          />
          <Polyline
            positions={sandbarRoute}
            pathOptions={{
              color: "#cd6dcd",
              dashArray: "7, 10",
              dashOffset: "20",
              weight: 2,
            }}
          />
        </>
      )}
    </>
  );
};

export default Polylines;
