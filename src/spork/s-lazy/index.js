import { Element } from '@polymer/polymer/polymer-element';
import { customElements, dispatchEvent, CustomEvent, addEventListener, removeEventListener } from 'global/window';
import { SporkStoreMixin } from 's-store';

class Component extends SporkStoreMixin(Element) {
  static get is () { return 's-lazy'; }

  static get properties () {
    return {
      fragments: {
        type: Object,
        value: {},
        statePath: 'sfragments'
      }
    };
  }

  constructor () {
    super();
    this._boundImport = this._import.bind(this);
  }

  connectedCallback () {
    super.connectedCallback();
    addEventListener('spork-lazy-load', this._boundImport);
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    removeEventListener('spork-lazy-load', this._boundImport);
  }

  _import (event) {
    const { detail } = event;
    const { name, page } = detail;
    this.import(name, page);
  }

  import (name, page) {
    if (this.fragments) {
      return (this.fragments[name] && typeof this.fragments[name] === 'function'
        ? this.fragments[name]()
        : Promise.reject(new Error('No fragment found'))
      )
        .then(() => dispatchEvent(new CustomEvent('spork-lazy-loaded', { detail: { name } })))
        .catch(error => {
          console.log(error);
          if (page) dispatchEvent(new CustomEvent('spork-no-page-found'));
        });
    }
    console.log('no fragments');
  }
}

!customElements.get(Component.is)
  ? customElements.define(Component.is, Component)
  : console.warn(`${Component.is} is already defined`);
