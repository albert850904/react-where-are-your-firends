import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "../../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";

import "./PlaceList.css";

const PlaceList = (props) => {
  if (!props.items?.length) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places Found</h2>
        </Card>
        <Link to="/">Share Place</Link>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          desc={place.desc}
          address={place.address}
          createId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

PlaceList.propTypes = {
  items: PropTypes.arrayOf().isRequired,
};

export default PlaceList;
