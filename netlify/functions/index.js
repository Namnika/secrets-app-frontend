require("ignore-styles");

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['react', '@babel/preset-es2015'],
});

require('./server');
