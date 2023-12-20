/* eslint-disable prettier/prettier */
import axios from 'axios';
import AlertFailed from '../../components/AlertConfirmation/AlertFailed';
import AlertSuccess from '../../components/AlertConfirmation/AlertSuccess';

const base_url = 'https://ruby-long-kingfisher.cyclic.app';

export const loginAction = (email, password) => async dispatch => {
  let loginUrl = '/auth/login';
  let bodyData = {
    email,
    password,
  };
  try {
    dispatch({type: 'LOGIN_REQUEST'});
    const result = await axios.post(base_url + loginUrl, bodyData, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    dispatch({payload: result.data, type: 'LOGIN_SUCCESS'});
  } catch (err) {
    dispatch({payload: err.response.data, type: 'LOGIN_ERROR'});
    AlertFailed(
      'Login Failed',
      err.response.data.messsage || err.response.data.message,
    );
  }
};

export const logoutAction = () => async (dispatch, getState) => {
  dispatch({type: 'LOGOUT'});
};

export const registerAction =
  (name, email, password, navigation) => async dispatch => {
    let registerUrl = '/auth/register';
    let bodyData = {
      name,
      email,
      password,
    };
    try {
      dispatch({type: 'AUTH_REGISTER_PENDING'});
      const result = await axios.post(base_url + registerUrl, bodyData, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      });
      dispatch({payload: result.data, type: 'AUTH_REGISTER_SUCCESS'});
      AlertSuccess('Register Success', result.data.message);
      navigation.navigate('Login');
    } catch (err) {
      dispatch({payload: err.response.data, type: 'AUTH_REGISTER_ERROR'});
      AlertFailed(
        'Register Failed',
        err.response.data.messsage || err.response.data.message,
      );
    }
  };

export const getOTPAction = (email, navigation) => async dispatch => {
  let getOTPUrl = '/auth/forgot-password';
  let bodyData = {
    email,
  };
  try {
    dispatch({type: 'GET_OTP_REQUEST'});
    const result = await axios.post(base_url + getOTPUrl, bodyData, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    dispatch({payload: result.data, type: 'GET_OTP_SUCCESS'});
    AlertSuccess('Success', result.data.message);
    navigation.navigate('CheckEmail');
  } catch (err) {
    dispatch({payload: err.response.data, type: 'GET_OTP_ERROR'});
    AlertFailed(
      'Failed',
      err.response.data.messsage || err.response.data.message,
    );
  }
};

export const resetPasswordAction =
  (otp, password, navigation) => async dispatch => {
    let data = {
      otp,
      password,
    };
    let resetPasswordUrl = '/auth/reset-password';
    try {
      dispatch({type: 'RESET_PASSWORD_REQUEST'});
      const result = await axios.post(base_url + resetPasswordUrl, data, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      });
      dispatch({payload: result.data, type: 'RESET_PASSWORD_SUCCESS'});
      AlertSuccess('Reset Password Success', result.data.message);
      navigation.navigate('Login');
    } catch (err) {
      dispatch({payload: err.response.data, type: 'RESET_PASSWORD_ERROR'});
      AlertFailed(
        'Reset Password Failed',
        err.response.data.messsage || err.response.data.message,
      );
    }
  };
