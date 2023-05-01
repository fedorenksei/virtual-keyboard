const inputElement = document.createElement('textarea');
inputElement.classList.add('keyboard-app__input');

function getSelection() {
  const { selectionStart: start, selectionEnd: end } = inputElement;
  return { start, end };
}

export function getElement() {
  return inputElement;
}

export function add(character) {
  const selection = getSelection();
  const currentValue = inputElement.value;
  let newValue = currentValue.slice(0, selection.start);
  newValue += character;
  newValue += currentValue.slice(selection.end);
  inputElement.value = newValue;
  inputElement.setSelectionRange(selection.start + 1, selection.start + 1);
}
