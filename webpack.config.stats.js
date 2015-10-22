'use strict';

var StatsPlugin = require('stats-webpack-plugin');
var baseConfig = require('./webpack.config.production');

var config = Object.create(baseConfig);
config.plugins = config.plugins.concat(
  new StatsPlugin('stats.json')
);

module.exports = config;
