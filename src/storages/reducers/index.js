/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import auth from './auth';
import authRegister from './authRegister';
import authGetOTP from './authGetOTP';
import authResetPassword from './authResetPassword';

const rootReducers = combineReducers({
  auth,
  authRegister,
  authGetOTP,
  authResetPassword,
});

export default rootReducers;
