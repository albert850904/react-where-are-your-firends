import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validators';
import Button from '../../shared/components/UIElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './NewPlace.css';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const NewPlace = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      image: {
        value: '',
        isValid: '',
      },
    },
    false
  );

  const placeSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', formState.inputs.title.value);
    formData.append('address', formState.inputs.address.value);
    formData.append('desc', formState.inputs.description.value);
    formData.append('image', formState.inputs.image.value);
    formData.append('creator', authCtx.userId);
    try {
      await sendRequest(
        'http://192.168.17.3:5000/api/places',
        'POST',
        formData
      );

      // redirect user
      history.push('/ ');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal onClear={clearError} error={error} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid title"
          onChange={inputHandler}
        />
        <Input
          id="description"
          label="Description"
          element="textarea"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter at least five characters."
          onChange={inputHandler}
        />
        <Input
          id="address"
          label="Address"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onChange={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          center
          errorText="Please choose an image"
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
