#!/usr/bin/env node

/* eslint no-var:0, no-console:0, prefer-arrow-callback:0, func-names:0 */

var fs = require('fs');
var program = require('commander');
var chalk = require('chalk');
var jsonfile = require('jsonfile');
var reporter = require('../lib/reporter');
var swaggerDiff = require('../lib');


program
  .arguments('<oldSpec> <newSpec>')
  .description('Compute diff bewteen two Swagger 2.0 specs')
  .option('-o, --outfile <filename>', 'The output file, otherwise diff is printed on stdout')
  .option('-f, --outformat <format>', 'The output format, either json or raw, default is json')
  .option('-c, --config <filename>', 'The config file')
  .option('--no-color', 'Disable color in output')
  .action(function (oldSpec, newSpec, options) {
    if (!oldSpec) {
      errorHandler(new Error('oldSpec file path or URL is missing'));
    }
    if (!newSpec) {
      errorHandler(new Error('newSpec file path or URL is missing'));
    }
    swaggerDiff(oldSpec, newSpec, options.config)
      .then(function (diff) {
        if (options.outfile) {
          if (options.outformat === 'raw') {
            fs.writeFile(options.outfile, reporter(diff), function (err) {
              if (err) {
                console.log('Something went wrong when writting output in %s', options.outfile);
                errorHandler(err);
              }
              console.log('Diff file (raw) created %s', options.outfile);
              endHandler(diff);
            });
          } else {
            jsonfile.writeFile(options.outfile, diff, function (err) {
              if (err) {
                console.log('Something went wrong when writting output in %s', options.outfile);
                errorHandler(err);
              }
              console.log('Diff file (json) created %s', options.outfile);
              endHandler(diff);
            });
          }
        } else {
          console.log(reporter(diff));
          endHandler(diff);
        }
      })
      .catch(errorHandler);
  });

program
  .version(require('../package').version)
  .option('-d, --debug [filter]', 'Show debug output, by default only swagger-diff debug')
  .on('debug', function (filter) {
    process.env.DEBUG = filter || 'swagger-diff:*';
  })
  .parse(process.argv);

// Show help if no options were given
if (program.rawArgs && program.rawArgs.length < 3) {
  program.help();
}

/**
 * Writes error information to stderr and exits with a non-zero code
 * @param {Error} err
 */
function errorHandler(err) {
  console.error(chalk.red(err.stack));
  process.exit(1);
}

function endHandler(diff) {
  if (diff.errors.length > 0) {
    process.exit(1);
  }
  process.exit(0);
}
