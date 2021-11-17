import React from "react";
import PropTypes from "prop-types";

import "./Avatar.css";

const Avatar = (props) => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
};

export default Avatar;
