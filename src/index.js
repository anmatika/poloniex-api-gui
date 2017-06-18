import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import SocketApi from './components/SocketApi';
import service from './components/service';
import App from './App';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import appReducer from './reducers/poloniex';
import './index.css';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers({ app: appReducer, form: formReducer, router });
const store = createStoreWithMiddleware(reducer);

service.socketApi = new SocketApi();

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,

document.getElementById('root'));
registerServiceWorker();
