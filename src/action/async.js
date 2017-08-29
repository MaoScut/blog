import * as ActionTypes from '../actionTypes';
import * as api from '../store';

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
