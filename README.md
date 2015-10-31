# swagger-diff

[![Build Status][travis-image]][travis-url]

This package provides utils and CLI to compute the diff between two swagger API specifications. Output diff can be configured according to version change.


## Compatilibity

Supports only [swagger spec 2.0](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md).


## Usage
The binary allows you to use swagger-diff in CLI.
```bash
$ swagger-diff <old> <new>
```
It prints the diff between old and new swagger files according to [configuration](#configuration) and returns false if any diff "error".

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
    "break": 2,
    "smooth": 2
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

To compute the diff, it exectutes a workflow composed of 3 main steps.

### Preparation

#### Dereference

Resolve JSON references and dereference URIs.

#### Inline global definitions

Swagger spec 2.0 allows to specify global definitions for `parameters`, `security`, `schemes`, `consumes` and `produces` that can then be overriden when needed.

This step, inline these definitions in every paths objects.

### Compute Raw diff
[diff](https://github.com/flitbit/diff) lib is used to compute deep raw diff.

### Exectute Rules
Exectute each rule on each raw diff.


[travis-url]: https://travis-ci.org/zallek/swagger-diff
[travis-image]: https://travis-ci.org/zallek/swagger-diff.svg
