import { combineReducers } from 'redux';
import courseReducer from './courseReducer';

const rootReducer = combineReducers({
  course: courseReducer
});

export default rootReducer;
