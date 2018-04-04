import { Element } from '@polymer/polymer/polymer-element';
import { customElements } from 'global/window';
import template from './template.html';
import style from './style.styl';

/**
 * @polyer
 * @extends HTMLElement
 */
class Component extends Element {
  static get is () { return 's-hero-header'; }

  static get template () {
    return `
      <style>${style}</style>
      ${template}
    `;
  }
  static get properties () {
    return {
      value: {
        type: String
      }
    };
  }
}

!customElements.get(Component.is)
  ? customElements.define(Component.is, Component)
  : console.warn(`${Component.is} is already defined`);
