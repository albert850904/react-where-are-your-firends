import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/UIElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../utils/validators";
import { DUMMY_PLACES } from "./UserPlaces";
import { useForm } from "../../shared/hooks/form-hook";

import "./NewPlace.css";
import Card from "../../shared/components/UIElements/Card";

const UpdatePlace = () => {
  const placeId = useParams("placeId").placeId;
  const [isLoading, setIsLoading] = useState(true);
  const place = DUMMY_PLACES.find((place) => place.id === placeId);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
    },
    false
  );

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  useEffect(() => {
    if (!place) return;
    setFormData(
      {
        title: {
          value: place.title,
          isValid: true,
        },
        description: {
          value: place.desc,
          isValid: true,
        },
      },
      true
    );
    setIsLoading(false);
  }, [setFormData, place]);

  if (!place) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onChange={inputHandler}
        initValue={formState.inputs.title.value}
        initValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="texterea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description min 5 characters"
        onChange={inputHandler}
        initValue={formState.inputs.description.value}
        initValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
