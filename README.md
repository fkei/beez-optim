beez-optim
==========


# About

特定のディレクトリを指定して、`optipng` `jpegoptim` `pngquant` を実行し画像を圧縮するコマンドです。

> 拡張子 `.png` `.jpg` `.jpeg` で画像判定します。


# deps

- [jpegoptim](https://github.com/tjko/jpegoptim)
- [optipng](http://optipng.sourceforge.net/)
- [pngquant](http://pngquant.org/)

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
    },
    pngquant: {
        use: false,
        options: "--ext .png -f -v"
    }
}
```

# Command line help

```sh
$ beez-optim -h

  Usage: beez-optim [options]

  Options:

    -h, --help                output usage information
    -p --limit <limit>        process limit default=10
    -s --srcdir <srcdir>      Source directory root path.
    -c --config <config>      configuration file.
    example config data:
        {
          "optipng": {
            "use": true,
            "level": 2
          },
          "jpegoptim": {
            "use": true,
            "options": '--strip-all'
          },
          "pngquant": {
            "use": false,
            "options": "--ext .png -f -v"
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
