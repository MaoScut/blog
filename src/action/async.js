import Cookie from 'js-cookie';
import * as ActionTypes from '../actionTypes';
import * as api from '../store';
import history from '../history';

export function fetchArticles() {
  return (dispatch) => {
    api.fetchArticles().then(result => dispatch({
      type: ActionTypes.FETCH_ARTICLES,
      payload: result,
    }));
  };
}
export function fetchExactArticle(articleId) {
  return (dispatch) => {
    api.fetchArticles().then((result) => {
      const article = result.filter(v => v.articleId === articleId)[0];
      dispatch({
        type: ActionTypes.FETCH_EXACT_ARTICLES,
        payload: article,
      });
    });
  };
}

function errorHandler(dispatch, error, type) {
  if (error.status === 401) {
    dispatch({
      type,
      payload: 'you are not authorized to do this',
    });
  } else {
    dispatch({
      type,
      payload: error.message,
    });
  }
}

export function registerUser({ email, password }) {
  return (dispatch) => {
    api.registerUser({ email, password }, (error, response) => {
      if (error) return errorHandler(dispatch, error, ActionTypes.AUTH_ERROR);
      Cookie.set('token', response);
      dispatch({ type: ActionTypes.AUTH_USER });
      history.push('/');
    });
  };
}

export function loginUser({ email, password }) {
  return (dispatch) => {
    api.loginUser({ email, password }, (error, response) => {
      if (error) return errorHandler(dispatch, error, ActionTypes.AUTH_ERROR);
      Cookie.set('token', response);
      dispatch({ type: ActionTypes.AUTH_USER, payload: email });
      history.push('/');
    });
  };
}

export function logoutUser() {
  return (dispatch) => {
    Cookie.remove('token');
    dispatch({ type: ActionTypes.UNAUTH_USER });
    history.push('/');
  };
}

export function add({ title, content, articleType }) {
  if (Cookie.get('token')) {
    return (dispatch) => {
      api.add({
        ownerId: Cookie.get('token'),
        title,
        content,
        articleType,
      }).then(articles => dispatch({
        type: ActionTypes.FETCH_ARTICLES,
        payload: articles,
      }));
    };
  }
  history.push('/login');
}

export function myArticles() {
  const ownerId = Cookie.get('token');
  return (dispatch) => {
    api.fetchPrivateArticles(ownerId).then((result) => {
      dispatch({
        type: ActionTypes.GET_PRIVATE_ARTICLES,
        payload: result,
      });
      history.push('/private');
    });
  };
}
