import bootstrap from 'bootstrap';
import * as jquery from 'jquery';
const mdb = require('mdbootstrap/js/mdb.min.js');

interface IClientWindow extends Window {
  jQuery: any;
  $: any;
}

(window as IClientWindow).jQuery = jquery;
(window as IClientWindow).$ = jquery;

module.exports = {
  jquery,
  bootstrap,
  mdb,
};
