import { reducers, store } from 's-store';
import { combineReducers } from 'redux';

const ROUTER_ACTION = {
  PARAMS: 'SPORK_ROUTER_UPDATE_PARAMS',
  ROUTE: 'SPORK_ROUTER_UPDATE_ROUTE',
  PAGE: 'SPORK_ROUTE_UPDATE_PAGE'
};

reducers.srouter = (srouter = {}, action) => {
  switch (action.type) {
    case ROUTER_ACTION.PARAMS:
      return Object.assign({}, srouter, {
        params: action.params
      });
    case ROUTER_ACTION.ROUTE:
      return Object.assign({}, srouter, {
        route: action.route
      });
    case ROUTER_ACTION.PAGE:
      return Object.assign({}, srouter, {
        page: action.page
      });
    default:
      return srouter;
  }
};

store.replaceReducer(combineReducers(reducers));

export { ROUTER_ACTION };
