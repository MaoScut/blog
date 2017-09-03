import { combineReducers } from 'redux';
import articles from './articles';
import privateArticles from './privateArticles';
import auth from './auth';
import error from './error';

const root = combineReducers({
  articles,
  privateArticles,
  auth,
  error,
});
export default root;
