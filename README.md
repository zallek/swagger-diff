# swagger-diff

This package provides utils and CLI to compute the diff between to swagger spec 2.0. Output diff can be configured according to type of version change.


## Compatilibity

It only works on [swagger spec 2.0](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md) files.


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
    "break": {
      "major": 2,
      "minor": 3,
      "patch": 3
    },
    "smooth": {
      "major": 0,
      "minor": 1,
      "patch": 2
    }
  }
}
```


### Levels of log
```
3-error
2-warning
1-log
0-ignore
```

### Configure specific rules
YOu can also configure specific level of level for some rules.
```JSON
{
  "rules": {
    "delete-path": {
      "break": 2,
      "smooth": 2
    },
    "add-path": {
      "break": {
        "major": 2,
        "minor": 3,
        "patch": 3
      },
      "smooth": {
        "major": 0,
        "minor": 1,
        "patch": 2
      }
    }
  }
}
```

## How it works

The script exectutes 3 main processing to compute the diff.

### Preparation

#### Inline global definitions

Swagger spec 2.0 allows to define global values for `parameters`, `security`, `schemes`, `consumes` and `produces` than can then be ovverriden when needed.
This step, inlines these definitions in every paths objects.

#### Resolve References

This step resolve JSON references and inline those data.


### Compute Raw diff
Awesome [diff](https://github.com/flitbit/diff) lib is used to compute deep raw diff.

### Exectute Rules
Exectute each rule on each raw diff.

