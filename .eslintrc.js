const OFF = 0;
const ERROR = 2;

module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-await-in-loop': OFF,
    'arrow-parens': [ERROR, 'as-needed'],
    'function-paren-newline': [ERROR, 'consistent'],
    'comma-dangle': [ERROR, 'only-multiline'],
  },
};
