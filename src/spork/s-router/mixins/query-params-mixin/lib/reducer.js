import { reducers, store } from 's-store';
import { combineReducers } from 'redux';

const QUERYPARAMS_ACTION = {
  UPDATE: 'SPORK_QUERYPARAMS_UPDATE'
};

reducers.squery = (squery = {}, action) => {
  switch (action.type) {
    case QUERYPARAMS_ACTION.UPDATE:
      return Object.assign({}, squery, {
        params: action.params
      });
    default:
      return squery;
  }
};

store.replaceReducer(combineReducers(reducers));

export { QUERYPARAMS_ACTION };
