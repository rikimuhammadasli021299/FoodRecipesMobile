/* eslint-disable prettier/prettier */
const initialState = {
  data: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isErrorMessage: '',
};

const auth = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        isErrorMessage: '',
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: payload,
        isErrorMessage: '',
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        isErrorMessage: payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
        isErrorMessage: '',
      };
    default:
      return state;
  }
};

export default auth;
