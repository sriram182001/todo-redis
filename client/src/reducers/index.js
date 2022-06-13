import { createStore } from 'redux';
import Reducer from './auth'
import {applyMiddleware, compose} from 'redux'
  

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(Reducer,composeEnhancers(applyMiddleware()));

export default store;