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
  // todo: describe logic for functional keys
  const character = keys.pressKey(code);
  if (character) output.add(character);
}

document.addEventListener('keydown', (event) => {
  const { code } = event;
  handleKeyPress(code);
  outputElement.focus();
  event.preventDefault();
});
document.addEventListener('keyup', (event) => {
  const { code } = event;
  keys.releaseKey(code);
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
