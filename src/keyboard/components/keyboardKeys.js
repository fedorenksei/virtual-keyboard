import keysData from './keysData.js';

class Key {
  constructor(data) {
    this.code = data.code;
    this.en = data.en;
    this.ru = data.ru;

    this.element = document.createElement('div');
    this.element.classList.add('key');
  }

  render() {
    // todo: get language from localStorage
    this.element.innerText = this.en;
    return this.element;
  }
}

const keys = [];
keysData.forEach((data) => {
  const key = new Key(data);
  keys.push(key);
});

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
keyboard.append(...keys.map((key) => key.render()));

export function getElement() {
  return keyboard;
}
