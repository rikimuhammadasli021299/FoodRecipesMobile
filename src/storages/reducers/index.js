/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import auth from './auth';
import authRegister from './authRegister';
import authGetOTP from './authGetOTP';
import authResetPassword from './authResetPassword';
import editProfile from './editProfile';
import showComments from './showComments';
import postComment from './postComment';
import likedRecipes from './likedRecipes';
import unlikeRecipes from './unlikeRecipes';

const rootReducers = combineReducers({
  auth,
  authRegister,
  authGetOTP,
  authResetPassword,
  editProfile,
  showComments,
  postComment,
  likedRecipes,
  unlikeRecipes,
});

export default rootReducers;
