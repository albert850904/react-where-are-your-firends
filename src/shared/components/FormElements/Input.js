import React, { useReducer } from "react";
import PropTypes from "prop-types";

import "./Input.css";

const ACTION_CHANGE = "CHANGE";

const inputReducer = (state, action) => {
  switch (action.type) {
    case ACTION_CHANGE:
      return { ...state, value: action.val, isValid: true };
    default:
      return state;
  }
};

const Input = (props) => {
  // useReducer, 類似於useState, 可以handle complex state(或是interconnected), 但是可以寫logic
  // 第二個是init state
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isVlid: false,
  });

  const changeHandler = (event) => {
    dispatch({ type: ACTION_CHANGE, val: event.target.value });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && "form-control--invalid"
      } ${props.className}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
};

Input.propTypes = {
  element: PropTypes.string,
  errorText: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default Input;
