# ivi project boilerplate

## Dependencies

- [TypeScript 2.1](https://www.typescriptlang.org)
- [gulp 4](http://gulpjs.com/)
- [rollup](http://rollupjs.org/)
- [Google Closure Compiler](https://github.com/google/closure-compiler)
- [Browsersync](https://www.browsersync.io/)

## Project Tree structure

```
ivi-boilerplate
├── build
├── dist
├── src
│   ├── index.html
│   └── main.js
├── gulpfile.js
├── package.json
├── tsconfig.json
└── tslint.json
```

## Getting started

Install all dependencies.

```sh
$ npm install
```

Start `gulp serve` task.

```sh
$ gulp serve
```

## Gulp Tasks

### serve

Launches http server, watches for changes and compiles in Development Mode when something is changed.

```sh
$ gulp serve
```

### dist

Builds application for production.

```sh
$ gulp dist
```

### clean

Deletes `build` and `dist` directories.

```sh
$ gulp clean
```

### default

Alias for a dist task.

```sh
$ gulp
```
