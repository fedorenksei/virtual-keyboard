import keysData from './keysData.js';
import createElement from './createElement.js';

const CLASSNAMES = {
  KEY: 'key',
  KEY_PRESSED: 'key_pressed',
  KEYBOARD: 'keyboard',
  ROW: 'keyboard-row',
  VERTICAL_ARROWS: 'keyboard__vertical-arrows',
};

class Key {
  constructor(data) {
    this.code = data.code;
    this.chars = data.chars;

    this.element = createElement('div', CLASSNAMES.KEY);
    this.element.dataset.code = this.code;
  }

  render() {
    // todo: get language from localStorage
    this.element.innerText = this.chars.en.basic || this.code;
    return this.element;
  }

  press() {
    this.element.classList.add(CLASSNAMES.KEY_PRESSED);
    return this.element.innerText;
  }

  release() {
    this.element.classList.remove(CLASSNAMES.KEY_PRESSED);
  }
}

// todo: render full keyboard
const keyboard = createElement('div', CLASSNAMES.KEYBOARD);

const keyByCode = new Map();
const keysList = [];
const verticalArrows = createElement('div', CLASSNAMES.VERTICAL_ARROWS);
keysData.forEach((rowData) => {
  const rowElement = createElement('div', CLASSNAMES.ROW);
  keyboard.append(rowElement);

  rowData.forEach((keyData) => {
    const key = new Key(keyData);
    keysList.push(key);
    keyByCode.set(keyData.code, key);
    const keyElement = key.render();

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
