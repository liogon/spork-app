import template from './template.html';

export const SGridMixin = (superClass, name, style) => {
  return class extends superClass {
    static get is () { return `s-${name}`; }

    static get template () {
      return `
        <style>${style}</style>
        ${template}
      `;
    }

    connectedCallback () {
      super.connectedCallback();
      this._getAttributes();
    }

    _getAttributes () {
      const attrs = this.attributes;
      const container = this.shadowRoot.querySelector('[container]');
      if (name) container.classList.add(name);
      for (let i = 0; i < attrs.length; i++) {
        container.classList.add(attrs[i].name);
      }
    }
  };
};
