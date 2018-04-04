import { Element } from '@polymer/polymer/polymer-element';
import { customElements } from 'global/window';
import template from './template.html';
import style from './style.styl';
import 's-hero';
import 's-hero-header';
import 's-button';

class Component extends Element {
  static get is () { return 'page-test'; }

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