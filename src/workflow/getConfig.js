import { readFileSync } from 'jsonfile';
import defaultsDeep from 'lodash.defaultsdeep';
import defaultConfig from '../defaultConfig.json';


/**
 * @param  {string|objec}  config - The file path of the config file or the config file
 * @return {Object}
 */
export default function getConfig(config) {
  const baseConfig = typeof config === 'string' ? readFileSync(config) : config;

  return defaultsDeep(baseConfig, defaultConfig);
}
