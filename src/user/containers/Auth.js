import React, { useContext, useState } from 'react';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/UIElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../utils/validators';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './Auth.css';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const Auth = () => {
  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: true,
      },
      password: {
        value: '',
        isValid: true,
      },
    },
    true
  );

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    let res;
    if (isLoginMode) {
      try {
        res = await sendRequest(
          'http://192.168.17.3:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
      } catch (error) {
        console.log(error);
        return;
      }

      authCtx.login(res.userId, res.token);
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);
        res = await sendRequest(
          'http://192.168.17.3:5000/api/users/signup',
          'POST',
          formData // 會自動append head
        );
        authCtx.login(res.userId, res.token);
      } catch (error) {
        console.log(error);
        return;
      }
    }
  };

  const switchModeHandler = () => {
    // 從註冊變成登入
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined, image: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: true,
          },
          image: { value: null, isValid: false },
        },
        false
      );
    }
    setIsLoginMode((prevState) => !prevState);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={loginSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              type="text"
              label="Your Name"
              element="input"
              onChange={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name"
            />
          )}
          <Input
            id="email"
            type="email"
            label="Email"
            element="input"
            onChange={inputHandler}
            validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Email"
          />
          <Input
            id="password"
            type="password"
            label="Password"
            element="input"
            onChange={inputHandler}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
            errorText="Password is Required at least 6 characters"
          />
          {!isLoginMode && (
            <ImageUpload
              id="image"
              center
              onInput={inputHandler}
              errorText="Please choose an image"
            />
          )}
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'Login' : 'Signup'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch To {isLoginMode ? 'Signup' : 'Login'}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
