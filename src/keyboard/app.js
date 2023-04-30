import * as keys from './components/keyboardKeys.js';
import * as input from './components/inputField.js';

function renderElement() {
  const appElement = document.createElement('article');
  appElement.classList.add('keyboard-app');
  appElement.append(input.getElement());
  appElement.append(keys.getElement());
  return appElement;
}

export default function getAppElement() {
  return renderElement();
}
