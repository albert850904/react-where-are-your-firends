import React from "react";
import PropTypes from "prop-types";
import UserItem from "./UserItem";
import "./UsersList.css";
import Card from "../../shared/components/UIElements/Card";

const UsersList = (props) => {
  if (!props.items?.length) {
    return (
      <div className="center">
        <Card>
          <h2>No Users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places}
          />
        );
      })}
    </ul>
  );
};

UsersList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default UsersList;
