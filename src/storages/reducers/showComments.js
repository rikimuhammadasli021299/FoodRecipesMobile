/* eslint-disable prettier/prettier */
const initialState = {
  data: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isErrorMessage: '',
};

const showComments = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'SHOW_COMMENTS_REQUEST':
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        isErrorMessage: '',
      };
    case 'SHOW_COMMENTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: payload,
        isErrorMessage: '',
      };
    case 'SHOW_COMMENTS_ERROR':
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

export default showComments;
