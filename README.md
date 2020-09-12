# babel-preset-atomic

This includes the babel configuration used for JavaScript packages in atom-ide-community.

## Installation
```
npm install --save-dev babel-preset-atomic
```

You should also install the peer dependencies:
```
npm install -save-dev "@babel/core"
npm install -save-dev "@babel/cli"
```

## Usage
Create a `babel.config.js` file at the root of the project with the following content:
```js
let presets = [
  "babel-preset-atomic",
];

let plugins = [];

module.exports = {
  presets: presets,
  plugins: plugins,
  exclude: "node_modules/**",
  sourceMap: "inline",
};
```

## Options

1) `keepModules`

If you want to keep the ES modules as they are (not transforming `import` to `require`), set `BABEL_KEEP_MODULES` environment variable to `true`. This is useful with bundlers which need you to keep ES6 modules intact. By default the ES6 modules are transformed to ES5 (the value is `false`)
```
cross-env BABEL_KEEP_MODULES=true
```

To permanently set this option, you can add it to your babel config (which disables environment variable effectiveness):
```js
let presets = [
  [
    "babel-preset-atomic",
    {
      keepModules: true,
    },
  ],
];
```

2) `targets`

To change the target of `preset-env` plugin. By default this is configured for Electron.
```js
let presets = [
  [
    "babel-preset-atomic",
    {
      targets: {
        electron: 6,
      }
    },
  ],
];
```

3) `addModuleExports`:

Allows to `require` a ES6 module that has exported a single thing as `default`, in a ES5 fashion without `require().default`. This is `true` by default for backward compatibility with Atom packages.

```js
let presets = [
  [
    "babel-preset-atomic",
    {
      addModuleExports: false
    },
  ],
];
```

4) `addModuleExportsDefaultProperty`:

```js
let presets = [
  [
    "babel-preset-atomic",
    {
      addModuleExports: true,
      addModuleExportsDefaultProperty: true
    },
  ],
];
```

Adds `default` property to `module.exports` so the ES6 module can be required in the ES6 fashion as well (by `require().default`). This is `false` by default.

5) `sourceMap`

The type of source map. This is set to `"inline"` by default which is required by the bundlers.
```js
let presets = [
  [
    "babel-preset-atomic",
    {
      sourceMap: true,
    },
  ],
];
```

6) `react`

Enable `"@babel/preset-react"`. `true` by default.

7) `flow`

Enable `"@babel/preset-flow"`. `true` by default.

8) `removeAllUseStrict`

Remove all `'use strict'` from all files. Passed to `babel-plugin-transform-not-strict`. This is `false` by default.

## Behind the scenes

It includes the following presets:
- `"@babel/preset-env"` (configured for `electron`)
- `"@babel/preset-react"`
- `"@babel/preset-flow"`

It also includes all the proposal plugins such as:
- `"@babel/plugin-proposal-optional-chaining"`
- `"@babel/plugin-proposal-nullish-coalescing-operator"`
- `"@babel/plugin-proposal-export-default-from"`
- `"@babel/plugin-proposal-export-namespace-from"`
- ...

It includes the plugins for compile time code generation:
- `"babel-plugin-codegen"`
- `"babel-plugin-preval"`

It has the preset that automatically adds default export for older Node versions (so no `require().default` is needed).
- `"babel-plugin-add-module-exports"`

It has the plugin for removing `'use strict'`:
- `"babel-plugin-transform-not-strict"`
