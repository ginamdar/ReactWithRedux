import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionsTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';

}
export default function apiStatusReducer(state = initialState.apiCallsInProgress, action) {
  if (action.type === types.BEGIN_API_CALLS) {
    return state + 1;
  } else if (actionsTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}
