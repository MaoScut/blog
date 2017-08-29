import { combineReducers } from 'redux';
import articles from './articles';
import article from './article';

const root = combineReducers({
  articles,
  article,
});
export default root;
