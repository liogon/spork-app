import { reducers, store } from 's-store';
import { combineReducers } from 'redux';

const LOCATION_ACTION = {
  PATH: 'SPORK_LOCATION_UPDATE_PATH',
  QUERY: 'SPORK_LOCATION_UPDATE_QUERY',
  HASH: 'SPORK_LOCATION_UPDATE_HASH'
};

reducers.slocation = (slocation = {}, action) => {
  switch (action.type) {
    case LOCATION_ACTION.PATH:
      return Object.assign({}, slocation, {
        path: action.path
      });
    case LOCATION_ACTION.QUERY:
      return Object.assign({}, slocation, {
        query: action.query
      });
    case LOCATION_ACTION.HASH:
      return Object.assign({}, slocation, {
        hash: action.query
      });
    default:
      return slocation;
  }
};

store.replaceReducer(combineReducers(reducers));

export { LOCATION_ACTION };
