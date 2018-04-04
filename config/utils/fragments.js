import { reducers, store } from 's-store';
import { combineReducers } from 'redux';
const fragments = {'page-home': () => import(/* webpackChunkName: "page-home" */ 'page-home'), 'page-sample': () => import(/* webpackChunkName: "page-sample" */ 'page-sample'), 'page-test': () => import(/* webpackChunkName: "page-test" */ 'page-test')};
reducers.sfragments = (sfragments = fragments, action) => sfragments;
store.replaceReducer(combineReducers(reducers));
