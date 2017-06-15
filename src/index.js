import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import App from './App';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import appReducer from './reducers/poloniex';
import './index.css';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');
socket.on('message', msg => console.log(msg));
socket.on('connect', function (socket) {
    console.log('Connected!');
});
socket.emit('CH01', 'me', 'test msg');
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers({ app: appReducer, form: formReducer, router });
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,

document.getElementById('root'));
registerServiceWorker();
