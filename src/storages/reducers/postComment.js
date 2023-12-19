/* eslint-disable prettier/prettier */
const initialState = {
  data: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isErrorMessage: '',
};

const postComment = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'POST_COMMENTS_REQUEST':
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        isErrorMessage: '',
      };
    case 'POST_COMMENTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: payload,
        isErrorMessage: '',
      };
    case 'POST_COMMENTS_ERROR':
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

export default postComment;
