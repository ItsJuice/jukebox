import { createStore as originalCreateStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import history from './utils/browser-history';

let enhancedCreateStore;

if (__DEV__) {
  enhancedCreateStore = compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      createLogger()
    )
  )(originalCreateStore);
} else {
  enhancedCreateStore = compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    )
  )(originalCreateStore);
}

export default enhancedCreateStore;
