import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import createBrowserHistory from 'history/createBrowserHistory';


//Only for development..
const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

const composeEnhancers = typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

export const configuredStore = function (browserHistory, initialState = {}) {
  const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleware, routerMiddleware(browserHistory), loggerMiddleware)
  );

  const store = createStore(reducers, initialState, enhancer);
  return store;
};

let s, h;
let browserHistory = createBrowserHistory();
s = configuredStore(browserHistory);
h = syncHistoryWithStore(browserHistory, s);

export const store = s;
export const history = h;
