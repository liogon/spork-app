import { Element } from '@polymer/polymer/polymer-element';
import { customElements } from 'global/window';
import template from './template.html';
import style from './style.styl';
import 's-nav';
import 's-content';
import 's-view';

class Component extends Element {
  static get is () { return 's-app'; }

  static get template () {
    return `
      <style>
      ${style}
      </style>
      ${template}
    `;
  }
}

!customElements.get(Component.is)
  ? customElements.define(Component.is, Component)
  : console.warn(`${Component.is} is already defined`);
