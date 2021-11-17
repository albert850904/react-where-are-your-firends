import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = (props) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  children: PropTypes.shape({}),
};

export default Card;
