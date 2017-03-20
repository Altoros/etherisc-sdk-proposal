// todo: +fetch polyfill

import {
  $$,
  hasClass,
  addClass
} from './helpers';

import UI from './ui';

(function() {
  let el, element;

  element = $$('etherisc-script');


  // make sure we have only one active etherisc script
  element = function() {
    let _i, _len, _results;
    _results = [];
    for (_i = 0, _len = element.length; _i < _len; _i++) {
      el = element[_i];
      if (!hasClass(el, "active")) {
        _results.push(el)
      }
    }
    return _results
  }();
  element = element[element.length - 1];
  if (!element) {
    return
  }
  addClass(element, "active");

  // render UI
  return new UI(element);
  //return ui.append();
})()


