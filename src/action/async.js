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
export function receiveArticles() {

}