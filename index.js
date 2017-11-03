'use strict';

const ThreadEmancipator = require('./thread-emancipator');

module.exports = function threadEmancipator(...args) {
  const threadEmancipator = new ThreadEmancipator({ scriptPath: args[0], url: args[1] });
  return threadEmancipator.evaluate();
};
