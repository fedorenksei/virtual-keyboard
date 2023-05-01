import * as keys from './components/keyboardKeys.js';
import * as output from './components/inputField.js';
import createElement from './components/createElement.js';

const constants = {
  APP_CLASS: 'keyboard-app',
  DESCRIPTION_CLASS: 'keyboard-app__description',
  DESCRIPTION_TEXT: 'This keyboard is created using macOS. Press Ctrl+Alt to switch between English and Russian layouts.',
};
const outputElement = output.getElement();
const keysElement = keys.getElement();

function handleKeyPress(code) {
  if (code === 'Backspace') {
    output.backspace();
  }

  const character = keys.pressKey(code);
  outputElement.focus();
  if (character) output.add(character);
}

const stickedKeys = new Set();
let metaKey = false;
document.addEventListener('keydown', (event) => {
  const { code } = event;
  handleKeyPress(code);
  if (metaKey) stickedKeys.add(code);
  if (code === 'MetaLeft' || code === 'MetaRight') {
    metaKey = true;
  }
  event.preventDefault();
});
document.addEventListener('keyup', (event) => {
  const { code } = event;
  keys.releaseKey(code);
  if (code === 'MetaLeft' || code === 'MetaRight') {
    stickedKeys.forEach((c) => {
      keys.releaseKey(c);
    });
    metaKey = false;
    return;
  }
  if (metaKey) stickedKeys.add(code);
});

keysElement.addEventListener('mousedown', (event) => {
  if (event.button !== 0) return;
  const code = keys.getCodeByMouseEvent(event);
  if (!code) return;
  handleKeyPress(code);

  document.addEventListener('mouseup', () => {
    keys.releaseKey(code);
  });
});

let appElement;
function renderElement() {
  appElement = createElement('article', constants.APP_CLASS);
  appElement.append(outputElement);
  appElement.append(keysElement);
  const description = createElement('p', constants.DESCRIPTION_CLASS);
  description.innerText = constants.DESCRIPTION_TEXT;
  appElement.append(description);
  return appElement;
}
renderElement();

export default function getAppElement() {
  return appElement;
}
