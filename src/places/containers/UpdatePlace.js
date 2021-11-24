import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/UIElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validators';
import { useForm } from '../../shared/hooks/form-hook';

import './NewPlace.css';
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';

const UpdatePlace = () => {
  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const placeId = useParams('placeId').placeId;
  const history = useHistory();
  const [place, setPlace] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: true,
      },
      description: {
        value: '',
        isValid: true,
      },
    },
    false
  );

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://192.168.17.3:5000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          desc: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      history.push(`/${authCtx.userId}/places`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await sendRequest(
          `http://192.168.17.3:5000/api/places/${placeId}`
        );
        setPlace(res.place);
        setFormData(
          {
            title: {
              value: res.place.title,
              isValid: true,
            },
            description: {
              value: res.place.desc,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [placeId, setFormData]);

  // 這個要先，不然會看到could not find place
  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!place && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {/* 為了確保initvalue可以被吃到，init需要連動place value 而不是formstate, 才可以在render時吃到值 */}
      {!isLoading && place && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onChange={inputHandler}
            initValue={place.title}
            initValid={place.title}
          />
          <Input
            id="description"
            element="texterea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description min 5 characters"
            onChange={inputHandler}
            initValue={place.desc}
            initValid={place.desc}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update Place
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
