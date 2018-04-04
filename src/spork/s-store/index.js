import { createStore } from 'redux';
import PolymerRedux from './mixins/polymer-redux';

const reducers = {};
const initial = {};
const store = createStore((state = initial, action) => state);
const SporkStoreMixin = PolymerRedux(store);

export { reducers, store, SporkStoreMixin };
