import { SporkStoreMixin } from 's-store';
import { QUERYPARAMS_ACTION } from './lib/reducer';

export const QueryParamsMixin = (superClass) => {
  return class extends SporkStoreMixin(superClass) {
    static get properties () {
      return {
        // query params 'paramsString', 'paramsObject', '_dontReact'
        paramsString: {
          type: String,
          observer: '_paramsStringChanged'
        },

        paramsObject: {
          type: Object,
          statePath: 'squery.params'
        },

        _dontReact: {
          type: Boolean
        }
      };
    }

    connectedCallback () {
      if (super.connectedCallback) {
        super.connectedCallback();
      }

      // initialize values
      this.paramsObject = {};
      this._dontReact = false;
    }

    _queryChanged (query) {
      this.paramsString = query;
    }

    _paramsStringChanged () {
      this._dontReact = true;
      this.dispatch({
        type: QUERYPARAMS_ACTION.UPDATE,
        params: this._decodeParams(this.paramsString)
      });

      // this.paramsObject =
      this._dontReact = false;
    }

    paramsObjectChanged () {
      if (this._dontReact) {
        return;
      }
      this.paramsString = this._encodeParams(this.paramsObject)
        .replace(/%3F/g, '?').replace(/%2F/g, '/').replace(/'/g, '%27');
    }

    _encodeParams (params) {
      var encodedParams = [];
      for (var key in params) {
        var value = params[key];
        if (value === '') {
          encodedParams.push(encodeURIComponent(key));
        } else if (value) {
          encodedParams.push(
            encodeURIComponent(key) +
            '=' +
            encodeURIComponent(value.toString())
          );
        }
      }
      return encodedParams.join('&');
    }

    _decodeParams (paramString) {
      var params = {};
      // Work around a bug in decodeURIComponent where + is not
      // converted to spaces:
      paramString = (paramString || '').replace(/\+/g, '%20');
      var paramList = paramString.split('&');
      for (var i = 0; i < paramList.length; i++) {
        var param = paramList[i].split('=');
        if (param[0]) {
          params[decodeURIComponent(param[0])] =
              decodeURIComponent(param[1] || '');
        }
      }
      return params;
    }
  };
};
