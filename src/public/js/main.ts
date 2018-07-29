interface IWindow extends Window {
  jQuery: any;
  $: any;
}

const w = window as IWindow;

const bootstrap = require('bootstrap');
import $ from 'jquery';

w.jQuery = $;
w.$ = $;

const mdb = require('mdbootstrap/js/mdb.min.js');
