import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE': {
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) continue;
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    }
    case 'SET_DATA': {
      return {
        inputs: action.inputs,
        isValid: action.isValid,
      };
    }
    default:
      return state;
  }
};

/**
 * stateful logic 被共用了，使用此hook的component, 會跟著此hooks state 改變而re-render
 * 有點像是state被嵌在component裡面了
 * 只能用在react function 裡面。
 * @param {*} initInputs
 * @param {*} initFormValidity
 * @returns
 */
export const useForm = (initInputs, initFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initInputs,
    isValid: initFormValidity,
  });

  // 這個function 會update state, state會造成此functional object 被rerender, 然後此function又會被重新建構
  // 此function 被重新建構, 又會觸發component 的useEffect >> infinite loop >> 用useCallback
  // useCallback 只會被觸發一次
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', value, isValid, inputId: id });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({ type: 'SET_DATA', inputs: inputData, isValid: formValidity });
  }, []);

  return [formState, inputHandler, setFormData];
};
