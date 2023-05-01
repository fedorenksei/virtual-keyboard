const inputElement = document.createElement('textarea');
inputElement.classList.add('keyboard-app__input');

export function getElement() {
  return inputElement;
}

export function add(character) {
  inputElement.value += character;
}
