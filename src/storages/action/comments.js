/* eslint-disable prettier/prettier */
import axios from 'axios';
import {OneSignal, LogLevel} from 'react-native-onesignal';

const base_url = 'https://crowded-goat-trunks.cyclic.app';

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
  (id_recipe, comment, idAuthorRecipe, titleRecipe, navigation) =>
  async (dispatch, getState) => {
    let postCommentRecipesUrl = '/comments';
    let data = {
      id_recipe,
      comment,
    };
    try {
      dispatch({type: 'POST_COMMENTS_REQUEST'});
      let token = await getState().auth.data.token.accessToken;
      let commenter = await getState().auth.data.name;
      const result = await axios.post(base_url + postCommentRecipesUrl, data, {
        headers: {
          token,
        },
      });
      dispatch({payload: result.data, type: 'POST_COMMENTS_SUCCESS'});
      dispatch(getComments(data.id_recipe));
      const options = {
        method: 'POST',
        url: 'https://onesignal.com/api/v1/notifications',
        headers: {
          accept: 'application/json',
          Authorization:
            'Basic NDBkYjM4MWYtYjQzMC00ZjMwLWI2Y2YtYTUxZjdkMGM4ZDIz',
          'content-type': 'application/json',
        },
        data: {
          app_id: '9fed0bad-fea6-4dc9-b4d5-d23857a12b7b',
          name: 'Comments',
          filters: [
            {field: 'tag', key: 'userID', relation: '=', value: idAuthorRecipe},
          ],
          contents: {
            en: `${commenter} comments your ${titleRecipe} recipe: "${comment}"`,
            id: `${commenter} mengomentari resep ${titleRecipe}: "${comment}"`,
          },
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log('success', response.data);
        })
        .catch(function (error) {
          console.error('error', error);
        });
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);
      OneSignal.Notifications.addEventListener('click', event => {
        console.log('OneSignal: notification comments:', event);
        navigation.navigate('ShowComments', {
          id_recipe: id_recipe,
        });
      });
    } catch (err) {
      dispatch({payload: err.message, type: 'POST_COMMENTS_ERROR'});
      dispatch(getComments(data.id_recipe));
    }
  };
