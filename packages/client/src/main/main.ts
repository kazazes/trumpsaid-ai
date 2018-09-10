// tslint:disable:no-var-requires
import { default as $ } from 'jquery';

const mainCSS = require('./assets/scss/main.scss');

(window as any).jQuery = $;
(window as any).$ = $;

import bootstrap from 'bootstrap';

require('mdbootstrap/js/mdb.min.js');

module.exports = {
  jQuery,
  bootstrap,
  mainCSS,
};
