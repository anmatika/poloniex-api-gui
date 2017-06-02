import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import App from './App';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import appReducer from './reducers/poloniex';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers({ app: appReducer });
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
 <Provider store={store} >
    <App />
</Provider>,

document.getElementById('root'));
registerServiceWorker();
