import * as keys from './components/keyboardKeys.js';
import * as output from './components/inputField.js';

const constants = {
  APP_CLASS: 'keyboard-app',
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
keysElement.addEventListener('mousedown', (event) => {
  const code = keys.getCodeByMouseEvent(event);
  if (code) handleKeyPress(code);
});

let appElement;
function renderElement() {
  appElement = document.createElement('article');
  appElement.classList.add(constants.APP_CLASS);
  appElement.append(outputElement);
  appElement.append(keysElement);
  return appElement;
}
renderElement();

export default function getAppElement() {
  return appElement;
}
