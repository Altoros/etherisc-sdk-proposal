const __indexOf = [].indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (i in this && this[i] === item) {
      return i;
    }
  }
  return -1;
};

export const $ = (sel) => document.querySelectorAll(sel);

export const $$ = (cls) => {
  var el, reg, _i, _len, _ref, _results;
  if (typeof document.getElementsByClassName === "function") {
    return document.getElementsByClassName(cls)
  } else if (typeof document.querySelectorAll === "function") {
    return document.querySelectorAll("." + cls)
  } else {
    reg = new RegExp("(^|\\s)" + cls + "(\\s|$)");
    _ref = document.getElementsByTagName("*");
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      el = _ref[_i];
      if (reg.test(el.className)) {
        _results.push(el)
      }
    }
    return _results
  }
};

export const hasAttr = (element, attr) => {
  let node;
  if (typeof element.hasAttribute === "function") {
    return element.hasAttribute(attr)
  } else {
    node = element.getAttributeNode(attr);
    return !!(node && (node.specified || node.nodeValue))
  }
};

export const trigger = (element, name, data, bubble) => {
  if (data == null) {
    data = {}
  }
  if (bubble == null) {
    bubble = true
  }
  if (window.jQuery) {
    return jQuery(element).trigger(name, data)
  }
};

export const addClass = (element, name) =>
  element.className += " " + name;

export const hasClass = (element, name) =>
  __indexOf.call(element.className.split(" "), name) >= 0;

export const css = (element, css) =>
  element.style.cssText += ";" + css;

export const insertBefore = (element, child) =>
  element.parentNode.insertBefore(child, element);

export const insertAfter = (element, child) =>
  element.parentNode.insertBefore(child, element.nextSibling);

export const append = (element, child) => element.appendChild(child);

export const remove = (element) => {
  let _ref;
  return (_ref = element.parentNode) != null ? _ref.removeChild(element) : void 0;
};

export const parents = (node) => {
  const ancestors = [];
  while ((node = node.parentNode) && node !== document && __indexOf.call(ancestors, node) < 0) {
    ancestors.push(node)
  }
  return ancestors
};

export const resolve = (url) => {
  const parser = document.createElement("a");
  parser.href = url;
  return "" + parser.href
};

export const text = (element, value) => {
  if ("innerText" in element) {
    element.innerText = value
  } else {
    element.textContent = value
  }
  return value;
};

export const create = (tag) =>
  document.createElement(tag);
