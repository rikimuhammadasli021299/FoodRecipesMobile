/* eslint-disable prettier/prettier */
const initialState = {
  data: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isErrorMessage: '',
};

const editProfile = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'UPDATE_PROFILE_REQUEST':
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        isErrorMessage: '',
      };
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: payload,
        isErrorMessage: '',
      };
    case 'UPDATE_PROFILE_ERROR':
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

export default editProfile;
