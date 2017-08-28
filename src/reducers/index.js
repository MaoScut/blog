import { combineReducers } from 'redux';
import articles from './articles';

const root = combineReducers({
  articles,
});
export default root;
