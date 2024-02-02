/* eslint-disable prettier/prettier */
const initialState = {
  data: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isErrorMessage: '',
  isActive: false,
};

const authActivateAccount = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'AUTH_ACTIVATE_ACCOUNT_PENDING':
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        isErrorMessage: '',
        isActive: false,
      };
    case 'AUTH_ACTIVATE_ACCOUNT_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: payload,
        isErrorMessage: '',
        isActive: true,
      };
    case 'AUTH_ACTIVATE_ACCOUNT_ERROR':
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        isErrorMessage: payload,
        isActive: false,
      };
    default:
      return state;
  }
};

export default authActivateAccount;
