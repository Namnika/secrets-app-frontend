require("ignore-styles");

require('@babel/register')({
  ignore: [/(node_module)/],
  presets: ['react', 'env'],
});

require('./server');
