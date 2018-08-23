import bootstrap from 'bootstrap';
import * as jquery from 'jquery';
const mdb = require('mdbootstrap/js/mdb.min.js');

interface IClientWindow extends Window {
  jQuery: any;
  $: any;
}

const w = window as IClientWindow;

w.jQuery = jquery;
w.$ = jquery;

module.exports = {
  jquery,
  bootstrap,
  mdb,
};
