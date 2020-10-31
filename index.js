let keepModulesEnv = false // false by default

if (process.env.BABEL_KEEP_MODULES === "true") {
  keepModulesEnv = true
}

function handleOptions(options) {
  let {targets, keepModules, addModuleExports, addModuleExportsDefaultProperty, react, flow, removeAllUseStrict,  notStrictDirectiveTriggers, notStrictCommentTriggers } = options

  // use Electron 5 targets by default
  if (targets == null) {
    targets = {
      electron: 5,
    }
  }

  // if not provided in the options, use the environment variable
  if (keepModules == null) {
    keepModules = keepModulesEnv
  }

  // add module exports by default
  if (addModuleExports == null) {
    addModuleExports = true
  }

  // do not add default property by default
  if (addModuleExportsDefaultProperty == null) {
    addModuleExportsDefaultProperty = false
  }

  if (react == null) {
    react = true
  }

  if (flow == null) {
    flow = true
  }

  if (removeAllUseStrict == null) {
    removeAllUseStrict = false
  }
  if (notStrictDirectiveTriggers == null) {
    notStrictDirectiveTriggers = ['use babel']
  }
  if (notStrictCommentTriggers == null) {
    notStrictCommentTriggers = ['@babel', '@flow', '* @babel', '* @flow']
  }

  return {targets, keepModules, addModuleExports, addModuleExportsDefaultProperty, react, flow, removeAllUseStrict, notStrictDirectiveTriggers, notStrictCommentTriggers }
}

module.exports = (api, options, dirname) => {

  const {targets, keepModules, addModuleExports, addModuleExportsDefaultProperty, react, flow, removeAllUseStrict, notStrictDirectiveTriggers, notStrictCommentTriggers } = handleOptions(options)

  let presets = [
    [
      require("@babel/preset-env"),
      {
        targets: targets,
        modules: keepModules ? false : "commonjs"
      },
    ],
  ];

  if (react) {
    presets.push(...[
      require("@babel/preset-react"),
    ]);
  }

  if (flow) {
    presets.push(...[
      require("@babel/preset-flow"),
    ]);
  }

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
    [require("@babel/plugin-proposal-private-methods"), { loose: true }],
    require("@babel/plugin-proposal-json-strings"),

    // compile time code generation
    require("babel-plugin-codegen"),
    require("babel-plugin-preval"),

    // not strict
    [require("babel-plugin-transform-not-strict"), {removeAll: removeAllUseStrict, directiveTriggers: notStrictDirectiveTriggers,  commentTriggers: notStrictCommentTriggers}],

    // reserved keywords
    require("@babel/plugin-transform-reserved-words")
  ];

  // transform modules (e.g when without Rollup)
  if (!keepModules) {
    plugins.push(...[
        require("@babel/plugin-transform-modules-commonjs"),
        require("@babel/plugin-syntax-dynamic-import"),
    ]);

    if (addModuleExports) {
      plugins.push(...[
        [require("babel-plugin-add-module-exports"), {addDefaultProperty: addModuleExportsDefaultProperty}] // atom needs this
      ]);
    }

  }

  return {
    presets: presets,
    plugins: plugins
  }
}
