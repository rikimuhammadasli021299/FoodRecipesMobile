/* eslint-disable prettier/prettier */
import axios from 'axios';

const base_url = 'https://crowded-goat-trunks.cyclic.app';

export const getLikedRecipesAction = () => async (dispatch, getState) => {
  let likedRecipesUrl = '/event/liked';
  try {
    dispatch({type: 'GET_MY_LIKED_REQUEST'});
    let token = await getState().auth.data.token.accessToken;
    const result = await axios.get(base_url + likedRecipesUrl, {
      headers: {
        token,
      },
    });
    dispatch({payload: result.data, type: 'GET_MY_LIKED_SUCCESS'});
  } catch (err) {
    dispatch({payload: err.message, type: 'GET_MY_LIKED_ERROR'});
  }
};

export const unlikeRecipesAction = id => async (dispatch, getState) => {
  let unlikedRecipesUrl = `/event/like/${id}`;
  try {
    dispatch({type: 'DELETE_MY_LIKED_REQUEST'});
    let token = await getState().auth.data.token.accessToken;
    const result = await axios.delete(base_url + unlikedRecipesUrl, {
      headers: {
        token,
      },
    });
    dispatch({payload: result.data, type: 'DELETE_MY_LIKED_SUCCESS'});
  } catch (err) {
    dispatch({payload: err.message, type: 'DELETE_MY_LIKED_ERROR'});
  }
};
