import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actionTypes';

const initialState = {
  auth: false,
  name: undefined,
};
const reducer = handleActions({
  [ActionTypes.AUTH_USER](state, action) {
    return {
      auth: true,
      name: action.payload,
    };
  },
  [ActionTypes.UNAUTH_USER]() {
    return {
      auth: false,
      name: undefined,
    };
  },
}, initialState);
export default reducer;
