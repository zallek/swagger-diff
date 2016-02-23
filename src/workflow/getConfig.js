import fs from 'fs';
import { readFileSync } from 'jsonfile';
import defaultsDeep from 'lodash.defaultsdeep';
import isPlainObject from 'lodash.isplainobject';
import defaultConfig from '../defaultConfig';


/**
 * @param  {string|object}  config - The file path of the config file or the config file
 * @return {Object}
 */
export default function getConfig(config) {
  let baseConfig;

  if (!config) {
    baseConfig = {};
  } else if (isPlainObject(config)) {
    baseConfig = config;
  } else if (typeof config === 'string') {
    if (process.browser) {
      throw new Error('Incorrect config, only object is supported in browser');
    } else {
      baseConfig = readConfigFile(config);
    }
  } else {
    throw new Error('Incorrect config');
  }

  return defaultsDeep(baseConfig, defaultConfig);
}

function readConfigFile(fileName) {
  try {
    fs.lstatSync(fileName);
  } catch (e) {
    return {};
  }
  return readFileSync(fileName);
}
