// automatically generated from babel.config.js by
// replacing `"(@babel.*)",` with `require("$1"),`
// replacing `module.exports = {(\s\S*)}` with `module.exports = () => {return $1}`

let presets = [
  [
    require("@babel/preset-env"),
    {
      targets: {
        electron: 5,
      },
    },
  ],
  require("@babel/preset-react"),
  require("@babel/preset-flow"),
];

let plugins = [
  require("@babel/plugin-proposal-function-bind"),

  require("@babel/plugin-proposal-export-default-from"),
  require("@babel/plugin-proposal-logical-assignment-operators"),
  [require("@babel/plugin-proposal-optional-chaining"), { loose: false }],
  [require("@babel/plugin-proposal-pipeline-operator"), { proposal: "minimal" }],
  [require("@babel/plugin-proposal-nullish-coalescing-operator"), { loose: false }],
  require("@babel/plugin-proposal-do-expressions"),

  [require("@babel/plugin-proposal-decorators"), { legacy: true }],
  require("@babel/plugin-proposal-function-sent"),
  require("@babel/plugin-proposal-export-namespace-from"),
  require("@babel/plugin-proposal-numeric-separator"),
  require("@babel/plugin-proposal-throw-expressions"),

  require("@babel/plugin-syntax-import-meta"),
  [require("@babel/plugin-proposal-class-properties"), { loose: true }],
  require("@babel/plugin-proposal-json-strings"),
];

if (process.env.BABEL_ENV === "production") {
  console.warn("setting `BABEL_ENV` to `production` for bypassing ES6 module transformming is deprecated. Use BABEL_KEEP_MODULES=\"true\" instead.")
}

if (process.env.BABEL_ENV === "development") {
  console.warn("setting `BABEL_ENV` to `development` for transform ES6 modules is deprecated. Use BABEL_KEEP_MODULES=\"false\" instead.")
}

// tranform modules
if (process.env.BABEL_KEEP_MODULES === "false" || !(process.env.BABEL_KEEP_MODULES) || process.env.BABEL_ENV === "development" || !(process.env.BABEL_ENV)) {
  // When without Rollup
  plugins.push(...[
    require("@babel/plugin-transform-modules-commonjs"),
    require("@babel/plugin-syntax-dynamic-import"),
    require("babel-plugin-add-module-exports",{"addDefaultProperty": true}) // atom needs this
  ]);
}

module.exports = () => {return {
  presets: presets,
  plugins: plugins,
  exclude: "node_modules/**",
  sourceMap: "inline",
};}
