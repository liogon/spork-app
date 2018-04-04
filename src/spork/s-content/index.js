import { Element } from '@polymer/polymer/polymer-element';
import { customElements } from 'global/window';
import template from './template.html';
import style from './style.styl';
import 's-router';
import 's-lazy';
import 's-grid/s-container';

class Component extends Element {
  static get is () { return 's-content'; }

  static get template () {
    return `
      <style>${style}</style>
      ${template}
    `;
  }
}

!customElements.get(Component.is)
  ? customElements.define(Component.is, Component)
  : console.warn(`${Component.is} is already defined`);
