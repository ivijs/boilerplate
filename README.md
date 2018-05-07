# ivi project boilerplate

## Dependencies

- [TypeScript 2.8](https://www.typescriptlang.org)
- [Webpack 4.7](https://webpack.js.org)
- [Google Closure Compiler](https://github.com/google/closure-compiler/)

## Project Tree structure

```
ivi-boilerplate
├── dist
├── public
│   └── index.html
├── src
│   └── main.ts
├── package.json
├── tsconfig.json
├── tslint.json
├── webpack.config.js
└── webpack.prod.config.js
```

## Getting started

Install all dependencies.

```sh
$ npm install
```

Start `webpack-dev-server` task.

```sh
$ npm run serve
```

## NPM Scripts

### serve

Launches `webpack-dev-server`, watches for changes and compiles in Development Mode when something is changed.

```sh
$ npm run serve
```

### dist

Builds application for production.

```sh
$ npm run dist
```
