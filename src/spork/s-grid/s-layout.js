import { Element } from '@polymer/polymer/polymer-element';
import { customElements } from 'global/window';
import { SGridMixin } from 's-grid';
import style from 'objects/grid.styl';
const name = 'layout';

class Component extends SGridMixin(Element, name, style) {}

!customElements.get(Component.is)
  ? customElements.define(Component.is, Component)
  : console.warn(`${Component.is} is already defined`);
