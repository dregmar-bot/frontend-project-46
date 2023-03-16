# genDiff

[![Actions Status](https://github.com/dregmar-bot/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/dregmar-bot/frontend-project-46/actions)
[![Node CI](https://github.com/dregmar-bot/frontend-project-46/actions/workflows/node.js.yml/badge.svg)](https://github.com/dregmar-bot/frontend-project-46/actions/workflows/node.js.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/2a3dd4e6948b155d0e7e/maintainability)](https://codeclimate.com/github/dregmar-bot/frontend-project-46/maintainability)
[![Test coverage](https://api.codeclimate.com/v1/badges/2a3dd4e6948b155d0e7e/test_coverage)](https://codeclimate.com/github/dregmar-bot/frontend-project-46/test_coverage)

The program is finding difference between two files (supported ext are .json, .yaml and .yml) and show it in chosen format.
Available formats:
- stylish
- plain
- json

## Setup

```bash
make install
```
## Dependencies
This library requires the following npm packages:

js-yaml: ^4.1.0,

lodash: ^4.17.21
## Syntax
```
genDiff(pathToFile1, pathToFile2[, formatter = stylish])
```

## Demo:

Flat .json files:
[![flat_json_stylish](https://asciinema.org/a/oiPu9LW4xrzMnpaeKFzII7REo.png)](https://asciinema.org/a/oiPu9LW4xrzMnpaeKFzII7REo)

Flat .yml files:
[![flat_yml_stylish](https://asciinema.org/a/j3huvjVs18GFeYLida14JEWhI.png)](https://asciinema.org/a/j3huvjVs18GFeYLida14JEWhI)

Nested .json and .yml files to stylish:
[![flat_yml_stylish](https://asciinema.org/a/HyM9DsYyYGHgo62TqCNPhAMGj.png)](https://asciinema.org/a/HyM9DsYyYGHgo62TqCNPhAMGj)

Nested .json and .yml files to plain:
[![flat_yml_stylish](https://asciinema.org/a/TpXhR8m8HnYmjt8h7TMvPtHce.png)](https://asciinema.org/a/TpXhR8m8HnYmjt8h7TMvPtHce)

Nested .json and .yml files to json:
[![flat_yml_stylish](https://asciinema.org/a/MnY0OzPUKIv1bNdtgAiZkP5YA.png)](https://asciinema.org/a/MnY0OzPUKIv1bNdtgAiZkP5YA)
