const path = require('path');

module.exports = {
  entry:{
    main: './src/app.js',
    form: './src/formulario.js'
  },
  output: {
    filename: '[name].main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};