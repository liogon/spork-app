import { Element } from '@polymer/polymer/polymer-element';
import { customElements, addEventListener, removeEventListener } from 'global/window';
import { LocationMixin } from './mixins/location-mixin';
import { QueryParamsMixin } from './mixins/query-params-mixin';
import { ROUTER_ACTION } from './lib/reducer';
import pathToRegexp from 'path-to-regexp';

class Component extends LocationMixin(QueryParamsMixin(Element)) {
  static get is () { return 's-router'; }

  static get properties () {
    return {
      params: {
        type: Object,
        statePath: 'srouter.params'
      },

      currentRoute: {
        type: String,
        statePath: 'srouter.route'
      },

      routes: {
        type: Array,
        statePath: 'spages'
      },

      notFoundPage: {
        type: String
      }
    };
  }

  static get observers () {
    return [
      '_checkPathRoute(path, routes)'
    ];
  }

  constructor () {
    super();
    this._boundNoPageFound = this._noPageFound.bind(this);
  }

  connectedCallback () {
    super.connectedCallback();
    addEventListener('spork-no-page-found', this._boundNoPageFound);
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    removeEventListener('spork-no-page-found', this._boundNoPageFound);
  }

  /**
   * Check path and route if it matches. Because the matching happens in the routes
   * themselves, it will wait for 200 milliseconds before showing the default, which
   * is the not-found route.
   *
   * @param {any} path
   * @memberof SporkRouter
   */
  _checkPathRoute (path) {
    if (path) {
      let exec = null;
      let keys = [];
      let currentRoute = null;
      let currentPage = null;
      this.routes.forEach(routeObj => {
        keys = [];
        const { route, page } = routeObj;
        const re = pathToRegexp(route, keys);
        const currentExec = re.exec(path);
        exec = exec || currentExec;
        currentRoute = currentExec ? route : currentRoute;
        currentPage = currentExec ? page : currentPage;
      });
      this._routeMatches(exec ? (currentRoute || 'not-found') : 'not-found', exec || [], keys, exec ? (currentPage || this.notFoundPage) : this.notFoundPage);
    }
  }

  _noPageFound () {
    this._routeMatches('not-found', [], this.notFoundPage);
  }

  _routeMatches (route, exec, keys, page) {
    const params = {};
    keys.forEach((key, index) => {
      const { name } = key;
      params[name] = exec[index + 1] || null;
    });

    this.dispatch({
      type: ROUTER_ACTION.PARAMS,
      params
    });

    this.dispatch({
      type: ROUTER_ACTION.ROUTE,
      route
    });

    this.dispatch({
      type: ROUTER_ACTION.PAGE,
      page
    });
  }
}

!customElements.get(Component.is)
  ? customElements.define(Component.is, Component)
  : console.warn(`${Component.is} is already defined`);
