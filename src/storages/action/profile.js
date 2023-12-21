/* eslint-disable prettier/prettier */
import axios from 'axios';

const base_url = 'https://crowded-goat-trunks.cyclic.app';

export const putPofile =
  (id_user, bodyData, navigation) => async (dispatch, getState) => {
    let putUserUrl = `/users/${id_user}`;
    try {
      dispatch({type: 'UPDATE_PROFILE_REQUEST'});
      let token = await getState().auth.data.token.accessToken;
      const result = await axios.put(base_url + putUserUrl, bodyData, {
        headers: {
          token,
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({payload: result.data.data, type: 'UPDATE_PROFILE_SUCCESS'});
      navigation.navigate('DetailProfile');
    } catch (err) {
      dispatch({payload: err.message, type: 'UPDATE_PROFILE_ERROR'});
    }
  };
