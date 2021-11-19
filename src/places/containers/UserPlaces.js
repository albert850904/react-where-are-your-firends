import React from "react";
import { useParams } from "react-router";
import PlaceList from "./components/PlaceList";

export const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    desc: "Good skyscraper",
    imageUrl:
      "https://bsmedia.business-standard.com/_media/bs/img/article/2021-09/20/full/1632080404-7898.jpg",
    address: "NY 100001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "EEE State Building",
    desc: "Good skyscraper",
    imageUrl:
      "https://bsmedia.business-standard.com/_media/bs/img/article/2021-09/20/full/1632080404-7898.jpg",
    address: "NY 100001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const UserPlaces = () => {
  const userId = useParams().uid;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
