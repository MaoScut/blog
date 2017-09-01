import { combineReducers } from 'redux';
import articles from './articles';
import article from './article';
import auth from './auth';
import error from './error';

const root = combineReducers({
  articles,
  article,
  auth,
  error,
});
export default root;
