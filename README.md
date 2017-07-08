# ivi project boilerplate

## Dependencies

- [TypeScript 2.4](https://www.typescriptlang.org)
- [Webpack 3.1](https://webpack.js.org)

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
└── webpack.config.js
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
