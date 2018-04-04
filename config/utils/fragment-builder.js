const pages = require('../pages.json');
const fs = require('fs');
const path = require('path');
const routes = [];
pages.forEach(page => {
  routes.push(`'${page.page}': () => import(/* webpackChunkName: "${page.page}" */ '${page.page}')`);
});
const string = `
import { reducers, store } from 's-store';
import { combineReducers } from 'redux';
const fragments = {${routes.join(', ')}};
reducers.sfragments = (sfragments = fragments, action) => sfragments;
store.replaceReducer(combineReducers(reducers));
`;
fs.writeFileSync(path.resolve(__dirname, './fragments.js'), string.trim() + '\n', 'utf-8');
