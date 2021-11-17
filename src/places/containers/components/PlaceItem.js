import React from "react";
import PropTypes from "prop-types";
import Card from "../../../shared/components/UIElements/Card";

import "./PlaceItem.css";

const PlaceItem = (props) => {
  return (
    <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="place-item__info">
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.desc}</p>
        </div>
        <div className="place-item__actions">
          <button>View on Map</button>
          <button>Edit Place</button>
          <button>Delete Place</button>
        </div>
      </Card>
    </li>
  );
};

PlaceItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default PlaceItem;
