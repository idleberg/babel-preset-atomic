let keepModules = false // false by default

if (process.env.BABEL_KEEP_MODULES === "true") {
  keepModules = true
}

let presets = [
  [
    require("@babel/preset-env"),
    {
      targets: {
        electron: 5,
      },
      modules: keepModules ? false : "commonjs"
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

  // compile time code generation
  require("babel-plugin-codegen"),
  require("babel-plugin-preval"),
];


// transform modules (e.g when without Rollup)
if (!keepModules) {
  plugins.push(...[
      require("@babel/plugin-transform-modules-commonjs"),
      require("@babel/plugin-syntax-dynamic-import"),
      [require("babel-plugin-add-module-exports"), {addDefaultProperty: false}] // atom needs this
  ]);
}


module.exports = () => {return {
  presets: presets,
  plugins: plugins,
  exclude: "node_modules/**",
  sourceMap: "inline",
};}
