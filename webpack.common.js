const path = require('path');

module.exports = {
  entry: {
    app: './js/model.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/model.js',
  },
};
