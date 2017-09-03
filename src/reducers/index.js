import { combineReducers } from 'redux';
import articles from './articles';
import privateArticles from './privateArticles';
import auth from './auth';
import error from './error';
import pop from './pop';

const root = combineReducers({
  articles,
  privateArticles,
  auth,
  error,
  pop,
});
export default root;
