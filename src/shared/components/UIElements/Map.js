import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./Map.css";

const Map = (props) => {
  const { center, zoom } = props;

  const mapContainerRef = useRef();

  // useEffect 會在JSX 被render 之後才會第一次執行。
  useEffect(() => {
    // 在第一次render時, ref還沒有被建立。
    const map = new window.google.maps.Map(mapContainerRef.current, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapContainerRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

Map.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  zoom: PropTypes.number.isRequired,
  className: PropTypes.string,
  style: PropTypes.string,
};

export default Map;
