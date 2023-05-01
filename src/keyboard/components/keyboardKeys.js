import keysData from './keysData.js';
import createElement from './createElement.js';

const CLASSNAMES = {
  KEY: 'key',
  KEY_PRESSED: 'key_pressed',
  KEYBOARD: 'keyboard',
  ROW: 'keyboard-row',
  VERTICAL_ARROWS: 'keyboard__vertical-arrows',
  LANG_PROP: 'keyboardLanguage',
};
const ENGLISH = 'en';
const RUSSIAN = 'ru';

let altKey = false;
let ctrlKey = false;
const keyByCode = new Map();
const keysList = new Set();

function switchLanguage() {
  const currLanguage = window.localStorage.getItem(CLASSNAMES.LANG_PROP);
  if (currLanguage === ENGLISH) {
    window.localStorage.setItem(CLASSNAMES.LANG_PROP, RUSSIAN);
  } else {
    window.localStorage.setItem(CLASSNAMES.LANG_PROP, ENGLISH);
  }

  keysList.forEach((key) => key.render());
}

class Key {
  constructor(data) {
    this.code = data.code;
    this.chars = data.chars;

    this.element = createElement('div', CLASSNAMES.KEY);
    this.element.dataset.code = this.code;

    this.render();
  }

  getElement() {
    return this.element;
  }

  render() {
    let language = window.localStorage.getItem(CLASSNAMES.LANG_PROP);
    if (!language) {
      language = ENGLISH;
      window.localStorage.setItem(CLASSNAMES.LANG_PROP, ENGLISH);
    }
    const currentValue = this.chars[language].basic;
    this.element.innerText = currentValue || this.code;
  }

  press() {
    this.element.classList.add(CLASSNAMES.KEY_PRESSED);

    if (['AltRight', 'AltLeft'].includes(this.code)) {
      altKey = true;
      if (ctrlKey) switchLanguage();
      return null;
    }
    if (['ControlRight', 'ControlLeft'].includes(this.code)) {
      ctrlKey = true;
      if (altKey) switchLanguage();
      return null;
    }

    return this.element.innerText;
  }

  release() {
    this.element.classList.remove(CLASSNAMES.KEY_PRESSED);

    if (['AltRight', 'AltLeft'].includes(this.code)) {
      altKey = false;
      return;
    }
    if (['ControlRight', 'ControlLeft'].includes(this.code)) {
      ctrlKey = false;
      return;
    }
  }
}

const keyboard = createElement('div', CLASSNAMES.KEYBOARD);
const verticalArrows = createElement('div', CLASSNAMES.VERTICAL_ARROWS);
keysData.forEach((rowData) => {
  const rowElement = createElement('div', CLASSNAMES.ROW);
  keyboard.append(rowElement);

  rowData.forEach((keyData) => {
    const key = new Key(keyData);
    keysList.add(key);
    keyByCode.set(keyData.code, key);
    const keyElement = key.getElement();

    if (keyData.code === 'ArrowUp') {
      verticalArrows.append(keyElement);
      rowElement.append(verticalArrows);
      return;
    }
    if (keyData.code === 'ArrowDown') {
      verticalArrows.append(keyElement);
      return;
    }

    rowElement.append(keyElement);
  });
});

export function getElement() {
  return keyboard;
}

export function getCodeByMouseEvent(event) {
  const { target } = event;
  const keyElement = target.closest(`.${CLASSNAMES.KEY}`);
  if (!keyElement) return null;
  const { code } = keyElement.dataset;
  return code;
}

export function pressKey(code) {
  const key = keyByCode.get(code);
  if (!key) return null;
  const character = key.press();
  return character;
}

export function releaseKey(code) {
  const key = keyByCode.get(code);
  if (key) key.release();
}
