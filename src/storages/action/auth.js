/* eslint-disable prettier/prettier */
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';

const base_url = 'https://bewildered-rose-leggings.cyclic.app';

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
    SweetAlert.showAlertWithOptions(
      {
        title: 'Failed!',
        subTitle: `error :  ${
          err.response.data.messsage || err.response.data.message
        } `,
        confirmButtonColor: '#000',
        style: 'error',
      },
      () =>
        console.log(err.response.data.messsage || err.response.data.message),
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
      SweetAlert.showAlertWithOptions(
        {
          title: 'Success!',
          subTitle: result.data.message,
          style: 'success',
        },
        () => console.log(result.data.message),
      );
      navigation.navigate('Login');
    } catch (err) {
      dispatch({payload: err.response.data, type: 'AUTH_REGISTER_ERROR'});
      SweetAlert.showAlertWithOptions(
        {
          title: 'Failed!',
          subTitle: `error :  ${
            err.response.data.messsage || err.response.data.message
          } `,
          confirmButtonColor: '#000',
          style: 'error',
        },
        () =>
          console.log(err.response.data.messsage || err.response.data.message),
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
    SweetAlert.showAlertWithOptions(
      {
        title: 'Success!',
        subTitle: result.data.message,
        style: 'success',
      },
      () => console.log(result.data.message),
    );
    // Swal.fire({
    //   title: 'Success!',
    //   text: result.data.message,
    //   icon: 'success',
    // });
    navigation.navigate('CheckEmail');
  } catch (err) {
    dispatch({payload: err.response.data, type: 'GET_OTP_ERROR'});
    SweetAlert.showAlertWithOptions(
      {
        title: 'Failed!',
        subTitle: `error :  ${
          err.response.data.messsage || err.response.data.message
        } `,
        confirmButtonColor: '#000',
        style: 'error',
      },
      () =>
        console.log(err.response.data.messsage || err.response.data.message),
    );
    // Swal.fire({
    //   title: 'Failed!',
    //   text: `error :  ${
    //     err.response.data.messsage || err.response.data.message
    //   } `,
    //   icon: 'error',
    // });
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
      SweetAlert.showAlertWithOptions(
        {
          title: 'Success!',
          subTitle: result.data.message,
          style: 'success',
        },
        () => console.log(result.data.message),
      );
      // Swal.fire({
      //   title: 'Success!',
      //   text: result.data.message,
      //   icon: 'success',
      // });
      navigation.navigate('Login');
    } catch (err) {
      dispatch({payload: err.response.data, type: 'RESET_PASSWORD_ERROR'});
      SweetAlert.showAlertWithOptions(
        {
          title: 'Failed!',
          subTitle: `error :  ${
            err.response.data.messsage || err.response.data.message
          } `,
          confirmButtonColor: '#000',
          style: 'error',
        },
        () =>
          console.log(err.response.data.messsage || err.response.data.message),
      );
      // Swal.fire({
      //   title: 'Failed!',
      //   text: `error :  ${
      //     err.response.data.messsage || err.response.data.message
      //   } `,
      //   icon: 'error',
      // });
    }
  };
