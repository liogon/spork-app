import { reducers, store } from 's-store';
import { combineReducers } from 'redux';
import pages from '../pages.json';
reducers.spages = (spages = pages, action) => spages;
store.replaceReducer(combineReducers(reducers));
