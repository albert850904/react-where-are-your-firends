import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Sana",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Minatozaki_Sana_160706_Nature_Collection.jpg/682px-Minatozaki_Sana_160706_Nature_Collection.jpg",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
