const React = require('react');

const Lottie = React.forwardRef((props, ref) => {
  return React.createElement('div', {
    ref,
    'data-testid': 'lottie-animation',
    ...props,
  });
});

Lottie.displayName = 'Lottie';

module.exports = Lottie;
module.exports.default = Lottie;
