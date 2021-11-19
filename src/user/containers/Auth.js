import React, { useContext, useState } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/UIElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utils/validators";

import "./Auth.css";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const authCtx = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: true,
      },
      password: {
        value: "",
        isValid: true,
      },
    },
    true
  );

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    authCtx.login();
  };

  const switchModeHandler = () => {
    // 從註冊變成登入
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, name: { value: "", isValid: true } },
        false
      );
    }
    setIsLoginMode((prevState) => !prevState);
  };

  return (
    <Card className="authentication">
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
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Password is Required at least 5 characters"
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "Login" : "Signup"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        Switch To {isLoginMode ? "Signup" : "Login"}
      </Button>
    </Card>
  );
};

export default Auth;
