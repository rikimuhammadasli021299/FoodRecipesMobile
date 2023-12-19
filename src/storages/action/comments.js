/* eslint-disable prettier/prettier */
import axios from 'axios';

const base_url = 'https://bewildered-rose-leggings.cyclic.app';

export const getComments = id_recipe => async (dispatch, getState) => {
  let commentRecipesUrl = `/comments/${id_recipe}`;
  try {
    dispatch({type: 'SHOW_COMMENTS_REQUEST'});
    let token = await getState().auth.data.token.accessToken;
    const result = await axios.get(base_url + commentRecipesUrl, {
      headers: {
        token,
      },
    });
    dispatch({payload: result.data, type: 'SHOW_COMMENTS_SUCCESS'});
  } catch (err) {
    dispatch({payload: err.message, type: 'SHOW_COMMENTS_ERROR'});
  }
};

export const postCommentAction =
  (id_recipe, comment) => async (dispatch, getState) => {
    let postCommentRecipesUrl = '/comments';
    let data = {
      id_recipe,
      comment,
    };
    try {
      dispatch({type: 'POST_COMMENTS_REQUEST'});
      let token = await getState().auth.data.token.accessToken;
      const result = await axios.post(base_url + postCommentRecipesUrl, data, {
        headers: {
          token,
        },
      });
      dispatch({payload: result.data, type: 'POST_COMMENTS_SUCCESS'});
      dispatch(getComments(data.id_recipe));
    } catch (err) {
      dispatch({payload: err.message, type: 'POST_COMMENTS_ERROR'});
      dispatch(getComments(data.id_recipe));
    }
  };
