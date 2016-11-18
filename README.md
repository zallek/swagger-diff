# swagger-diff

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

This package provides utils and CLI to compute the diff between two swagger API specifications. Output diff can be configured according to version change.


## Purpose
- Identify breaking and smooth changes.
- Ensure API versioning consistency.
- Compute API changelogs.
- Prevent unexpected API changes.


## Swagger Compatilibity

Supports only [swagger spec 2.0](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md).


## Installation
Install using npm:
```SH
npm install swagger-diff
```


## Usage

### CLI
The binary allows you to use swagger-diff in CLI.
```bash
$ swagger-diff <old> <new>
```
It prints the diff between old and new swagger files according to [configuration](#configuration) and returns false if any diff "error". It can also write the diff result in a JSON file. Use `-h` for option defails.

**Note:** `old` and `new` parameters can either be the file path or the URL of the swagger file.

Example of CLI output
![CLI output example](https://cloud.githubusercontent.com/assets/1886834/12273943/c748b518-b968-11e5-90ac-05102e184c35.png)


### Node
```JS
var SwaggerDiff = require('swagger-diff');

SwaggerDiff(oldSpec, newSpec, config).then(function (diff) {
  // Handle result
});
```
**Note:** on nodeJS, `oldSpec` and `newSpec` can either be a file path, a URL or a plain object. `config` can be a file path or a plain object.

**Note**: Please refer to [How it works](#how-it-works) section for details about output.


### Browsers
Dist folder contains an UMD bundle allowing you to either reference `swagger-diff.min.js` in your HTML or import module using Require.js.

Reference `swagger-diff.min.js` in your HTML and use the global variable `SwaggerDiff`.
```HTML
<script src="node_modules/swagger-diff/dist/swagger-diff.min.js"></script>
<script>
  SwaggerDiff(oldSpec, newSpec, config).then(function (diff) {
    // Handle result
  });
</script>
```
Or, if you're using AMD (Require.js), then import it into your module:
```HTML
<script src="node_modules/swagger-diff/dist/swagger-diff.min.js"></script>
<script>
  define(["SwaggerDiff"], function(SwaggerDiff) {
    SwaggerDiff(oldSpec, newSpec, config).then(function (diff) {
      // Handle result
    });
  })
</script>
```
**Note:** in browser, `oldSpec` and `newSpec` can only be a URL or a plain object. `config` can only be a plain object.

**Note**: Please refer to [How it works](#how-it-works) section for details about output.


## Diffs
Swagger-Diff defines rules that performs ONE type of diff checking. These rules are separated in 2 groups:
- breaking change
- smooth change

### Breaking changes
Examples:
- Delete path
- Rename path operationId
- Delete/Rename parametters
- Add a constraint on a parametter (like isRequired)
- Modify a response item

### Smooth changes
Examples:
- Add a path
- Add a param
- Add response item
- Add/Update descriptions


## Configuration

In the configuration file (default: .swagger-diff), you can customize the level of log you want for type of changes.
```JSON
{
  "changes": {
    "breaks": 3,
    "smooths": 2
  }
}
```

It's also possible to define different level of logs according to version change.
```JSON
{
  "changes": {
    "breaks": {
      "major": 2,
      "minor": 3,
      "patch": 3,
      "unchanged": 3
    },
    "smooths": {
      "major": 0,
      "minor": 1,
      "patch": 2,
      "unchanged": 3
    }
  }
}
```


### Levels of log
```
3-error
2-warning
1-info
0-ignore
```

### Configure specific rules
You can also configure specific level of level for some rules.
```JSON
{
  "rules": {
    "delete-path": 0,
    "add-path": {
      "major": 2,
      "minor": 3,
      "patch": 3,
      "unchanged": 3
    }
  }
}
```

## How it works

To compute the diff, it exectutes a workflow composed of 4 main steps.

[![How it works][schema-image]][schema-url]

### Preparation

#### Dereference
Resolve JSON references and dereference URIs.

#### Inline global definitions
Swagger spec 2.0 allows to specify global definitions for `parameters`, `security`, `schemes`, `consumes` and `produces` that can then be overriden when needed. It inlines these definitions in every paths objects.

#### Index definitions
`parameters` are indexed by their `name` in order to allow raw-diff to compare parameters nicely.

### Raw diff
[deep-diff](https://www.npmjs.com/package/deep-diff) lib is used to compute deep raw diff.

### Rules application
Exectute each rule on each raw diff to output breakings and smooth changes.

### Final diff
Post process diffs to output errors, warnings, infos according to configuration and version change.

**Note:** unmatchDiffs are the raw diffs that didn't much any rules. They can include breaking changes not implemented yet.


[npm-url]: https://www.npmjs.com/package/swagger-diff
[npm-image]: https://img.shields.io/npm/v/swagger-diff.svg?style=flat
[travis-url]: https://travis-ci.org/zallek/swagger-diff
[travis-image]: https://travis-ci.org/zallek/swagger-diff.svg?branch=master
[schema-url]: https://docs.google.com/drawings/d/1Xj20DzkaMYZc6zlPH8-F7wzlyap67vJCva6r0sKhDXM/edit?usp=sharing
[schema-image]: https://docs.google.com/drawings/d/1Xj20DzkaMYZc6zlPH8-F7wzlyap67vJCva6r0sKhDXM/pub?w=1440&h=493
