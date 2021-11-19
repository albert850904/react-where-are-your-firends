import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";

import { validate } from "../../../utils/validators";
import "./Input.css";

const ACTION_CHANGE = "CHANGE";
const ACTION_TOUCH = "TOUCH";

const inputReducer = (state, action) => {
  switch (action.type) {
    case ACTION_CHANGE:
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validator),
      };
    case ACTION_TOUCH:
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const { id, onChange } = props;
  // useReducer, 類似於useState, 可以handle complex state(或是interconnected), 但是可以寫logic
  // 第二個是init state
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initValue || "",
    isValid: props.initValid || false,
    isTouched: false,
  });

  const { value, isValid } = inputState;

  const changeHandler = (event) => {
    dispatch({
      type: ACTION_CHANGE,
      val: event.target.value,
      validator: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: ACTION_TOUCH });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  useEffect(() => {
    onChange(id, value, isValid);
  }, [id, onChange, value, isValid]);

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      } ${props.className}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

Input.propTypes = {
  element: PropTypes.string,
  initValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  errorText: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  className: PropTypes.string,
  validators: PropTypes.array,
  initValid: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default Input;
