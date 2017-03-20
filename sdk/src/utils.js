export const escape = (value) => {
  return value
    && ("" + value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;");
};

export const host = (url) => {
  let parent, parser;
  parent = document.createElement("div");
  parent.innerHTML = '<a href="' + escape(url) + '">x</a>';
  parser = parent.firstChild;
  return "" + parser.protocol + "//" + parser.host
}

export const parentHead = (doc) => {
  let head;

  if (doc != null) {
    if(doc.head) {
      head = doc.head;
    } else {
      head = doc.getElementsByTagName('head')[0]
    }
    if (!head) {
      head = doc.body;
    }
  }

  return head || false;
}

export const bind = (element, name, callback) => {
  if (element.addEventListener) {
    return element.addEventListener(name, callback, false)
  } else {
    return element.attachEvent("on" + name, callback)
  }
}

export const unbind = (element, name, callback) => {
  if (element.removeEventListener) {
    return element.removeEventListener(name, callback, false)
  } else {
    return element.detachEvent("on" + name, callback)
  }
}
