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
