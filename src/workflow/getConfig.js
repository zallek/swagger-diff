import fs from 'fs';
import { readFileSync } from 'jsonfile';
import defaultsDeep from 'lodash.defaultsdeep';
import isPlainObject from 'lodash.isplainobject';
import defaultConfig from '../defaultConfig';


/**
 * @param  {string|objec}  config - The file path of the config file or the config file
 * @return {Object}
 */
export default function getConfig(config) {
  let baseConfig = {};
  if (typeof config === 'string') {
    baseConfig = parseConfigFile(config);
  }
  if (isPlainObject(config)) {
    baseConfig = config;
  }

  return defaultsDeep(baseConfig, defaultConfig);
}

function parseConfigFile(fileName) {
  try {
    fs.lstatSync(fileName);
  } catch (e) {
    return {};
  }
  return readFileSync(fileName);
}
