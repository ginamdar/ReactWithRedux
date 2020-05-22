import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export default function configureStoreDev(initialState) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(
      thunk,
      reduxImmutableStateInvariant()
    ))
  );
}
