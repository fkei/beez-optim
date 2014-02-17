beez-optim
==========

# About

特定のディレクトリを指定して、optipng,jpegoptimを実行し画像を圧縮するコマンドです。

# Install

```sh
$ npm install -g beez-optim
```

# Test

```sh
$ npm test
```

# Configuration file

`-c` `--config` json data

```
{
    "optipng": {
        "use": true,
        "level": 3
    },
    "jpegoptim": {
        "use": true,
        "options": "--strip-all"
    }
}
```

# Command line help

```sh
$ beez-optim -h

  Usage: beez-optim [options]

  Options:

    -h, --help                output usage information
    -s --srcdir <srcdir>      Source directory root path.
    -c --config <config>      configuration file.
    example config data:
        {
          optipng: {
            use: true,
            level: 2
          },
          jpegoptim: {
            use: true,
            options: '--strip-all'
          }
        }

    -l --loglevel <loglevel>  Log level. default) INFO
       DEBUG: 1
       INFO:  2
       WARN:  3
       ERROR: 4
       FATAL: 5

```

# Example

## default

```sh
$ beez-optim -s /tmp/image
```

## option

```sh
$ beez-optim -s /tmp/image -c ./config.json -l 1
```

## LICENSE

The MIT License (MIT)

@see : [LICENSE](https://raw.github.com/fkei/beez-optim/master/LICENSE)
