import keysData from './keysData.js';

const CLASSNAMES = {
  KEY: 'key',
  KEY_PRESSED: 'key-pressed',
  KEYBOARD: 'keyboard',
};

class Key {
  constructor(data) {
    this.code = data.code;
    this.en = data.en;
    this.ru = data.ru;

    this.element = document.createElement('div');
    this.element.classList.add(CLASSNAMES.KEY);
    this.element.dataset.code = this.code;
  }

  render() {
    // todo: get language from localStorage
    this.element.innerText = this.en;
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

const keyByCode = new Map();
const keysList = [];
keysData.forEach((data) => {
  const key = new Key(data);
  keysList.push(key);
  keyByCode.set(data.code, key);
});

// todo: render full keyboard
const keyboard = document.createElement('div');
keyboard.classList.add(CLASSNAMES.KEYBOARD);
keyboard.append(...keysList.map((key) => key.render()));

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
