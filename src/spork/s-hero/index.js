import { Element } from '@polymer/polymer/polymer-element';
import { customElements } from 'global/window';
import template from './template.html';
import style from './style.styl';

/**
 * @polyer
 * @extends HTMLElement
 */
class Component extends Element {
  static get is () { return 's-hero'; }

  static get template () {
    return `
      <style>${style}</style>
      ${template}
    `;
  }

  static get properties () {
    return {
      backgroundImage: {
        type: String
      },
      fixed: {
        type: Boolean,
        value: false
      },
      repeat: {
        type: String,
        value: ''
      },
      position: {
        type: String,
        value: ''
      },
      size: {
        type: String,
        value: ''
      }
    };
  }

  static get observers () {
    return [
      '_changeBackgroundImage(backgroundImage, fixed)',
      '_changeRepeat(repeat, fixed)',
      '_changeBackgroundPosition(position, fixed)',
      '_changeBackgroundSize(size, fixed)'
    ];
  }

  _changeBackgroundImage (backgroundImage, fixed) {
    fixed
      ? this.style.backgroundImage = `url(${backgroundImage})`
      : this.shadowRoot.querySelector('.background').style.backgroundImage = `url(${backgroundImage})`;
  }

  _changeRepeat (repeat, fixed) {
    fixed
      ? this.style.backgroundRepeat = repeat || 'no-repeat'
      : this.shadowRoot.querySelector('.background').style.backgroundRepeat = repeat || 'no-repeat';
  }

  _changeBackgroundPosition (position, fixed) {
    fixed
      ? this.style.backgroundPosition = position || 'center center'
      : this.shadowRoot.querySelector('.background').style.backgroundPosition = position || 'center center';
  }

  _changeBackgroundSize (size, fixed) {
    fixed
      ? this.style.backgroundSize = size || 'cover'
      : this.shadowRoot.querySelector('.background').style.backgroundSize = size || 'cover';
  }
}

!customElements.get(Component.is)
  ? customElements.define(Component.is, Component)
  : console.warn(`${Component.is} is already defined`);
