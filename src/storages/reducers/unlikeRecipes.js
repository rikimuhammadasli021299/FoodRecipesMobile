/* eslint-disable prettier/prettier */
const initialState = {
  data: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isErrorMessage: '',
};

const unlikeRecipes = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'DELETE_MY_LIKED_REQUEST':
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        isErrorMessage: '',
      };
    case 'DELETE_MY_LIKED_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: payload,
        isErrorMessage: '',
      };
    case 'DELETE_MY_LIKED_ERROR':
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        isErrorMessage: payload,
      };
    default:
      return state;
  }
};

export default unlikeRecipes;
