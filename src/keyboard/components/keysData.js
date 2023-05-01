const rows = [];

const lastRow = ['Ctrl', 'Alt', 'Cmd', ' ', 'Cmd', 'Alt', '⇦', '⇧', '⇩', '⇨'];
const funcKeys = {
  tab: 'Tab',
  capsLock: 'Caps Lock',
  shift: 'Shift',
  enter: 'Enter',
  delete: 'Del',
};

const rowsData = [
  {
    codes: [
      'Backquote',
      ...Array(10).fill(null).map((v, i) => `Digit${(i + 1) % 10}`),
      'Minus', 'Equal', 'Backspace',
    ],
    chars: {
      en: { basic: [...'`1234567890-=', funcKeys.delete], shift: [...'~!@#$%^&*()_+', funcKeys.delete] },
      ru: { basic: [...']1234567890-=', funcKeys.delete], shift: [...'[!"№₽:√?;()_+', funcKeys.delete] },
    },
  },
  {
    codes: [
      'Tab',
      ...[...'QWERTYUIOP'].map((letter) => `Key${letter}`),
      'BracketLeft', 'BracketRight', 'Backslash',
    ],
    chars: {
      en: { basic: [null, ...'qwertyuiop[]\\'], shift: [null, ...'QWERTYUIOP{}|'] },
      ru: { basic: [null, ...'йцукенгшщзхъё'], shift: [null, ...'ЙЦУКЕНГШЩЗХЪЁ'] },
    },
  },
  {
    codes: [
      'CapsLock',
      ...[...'ASDFGHJKL'].map((letter) => `Key${letter}`),
      'Semicolon', 'Quote', 'Enter',
    ],
    chars: {
      en: {
        basic: [funcKeys.capsLock, ..."asdfghjkl;'", funcKeys.enter],
        shift: [funcKeys.capsLock, ...'ASDFGHJKL:"', funcKeys.enter],
      },
      ru: {
        basic: [funcKeys.capsLock, ...'фывапролджэ', funcKeys.enter],
        shift: [funcKeys.capsLock, ...'ФЫВАПРОЛДЖЭ', funcKeys.enter],
      },
    },
  },
  {
    codes: [
      'ShiftLeft',
      ...[...'ZXCVBNM'].map((letter) => `Key${letter}`),
      'Comma', 'Period', 'Slash', 'ShiftRight',
    ],
    chars: {
      en: { basic: [funcKeys.shift, ...'zxcvbnm,./', funcKeys.shift], shift: [funcKeys.shift, ...'ZXCVBNM<>?', funcKeys.shift] },
      ru: { basic: [funcKeys.shift, ...'ячсмитьбю.', funcKeys.shift], shift: [funcKeys.shift, ...'ЯЧСМИТЬБЮ,', funcKeys.shift] },
    },
  },
  {
    codes: [
      'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight',
      'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight',
    ],
    chars: {
      en: { basic: lastRow, shift: lastRow },
      ru: { basic: lastRow, shift: lastRow },
    },
  },
];

rowsData.forEach((row) => {
  const keys = [];
  row.codes.forEach((code, index) => {
    const {
      en: {
        basic: { [index]: enBasic },
        shift: { [index]: enShift },
      },
      ru: {
        basic: { [index]: ruBasic },
        shift: { [index]: ruShift },
      },
    } = row.chars;

    keys.push({
      code,
      chars: {
        en: { basic: enBasic, shift: enShift },
        ru: { basic: ruBasic, shift: ruShift },
      },
    });
  });
  rows.push(keys);
});

export default rows;
