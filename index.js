let keepModules = false // false by default

// import presets
import presetEnv from "@babel/preset-env"
import presetReact from "@babel/preset-react"
import presetFlow from "@babel/preset-flow"

// import plugins
import pluginProposalFunctionBind from "@babel/plugin-proposal-function-bind"

import pluginProposalExportDefaultFrom from "@babel/plugin-proposal-export-default-from"
import pluginProposalLogicalAssignmentOperator from "@babel/plugin-proposal-logical-assignment-operators"
import pluginProposalOptionalChaining from "@babel/plugin-proposal-optional-chaining"
import pluginProposalPipelineOperator from "@babel/plugin-proposal-pipeline-operator"
import pluginProposalCoalescingOperator from "@babel/plugin-proposal-nullish-coalescing-operator"
import pluginProposalDoExpressions from "@babel/plugin-proposal-do-expressions"

import pluginProposalDecorators from "@babel/plugin-proposal-decorators"
import pluginProposalFunctionSent from "@babel/plugin-proposal-function-sent"
import pluginProposalExportNameSpaceFrom from "@babel/plugin-proposal-export-namespace-from"
import pluginProposalNumericSeperator from "@babel/plugin-proposal-numeric-separator"
import pluginProposalThrowExpressions from "@babel/plugin-proposal-throw-expressions"

import pluginProposalImportMeta from "@babel/plugin-syntax-import-meta"
import pluginProposalClassProperties from "@babel/plugin-proposal-class-properties"
import pluginProposalJSONStrings from "@babel/plugin-proposal-json-strings"

// module tranformer
import pluginTransformModulesCommonJS from "@babel/plugin-transform-modules-commonjs"
import pluginSyntaxDynamicImport from "@babel/plugin-syntax-dynamic-import"
import pluginAddModuleExports from "babel-plugin-add-module-exports"


if (process.env.BABEL_ENV === "production") {
  keepModules = true
  console.warn("setting `BABEL_ENV` to `production` for bypassing ES6 module transformming is deprecated. Use BABEL_KEEP_MODULES=\"true\" instead.")
}

if (process.env.BABEL_ENV === "development") {
  console.warn("setting `BABEL_ENV` to `development` for transforming ES6 modules is deprecated. Use BABEL_KEEP_MODULES=\"false\" instead.")
}

if (process.env.BABEL_KEEP_MODULES === "true") {
  keepModules = true
}

let presets = [
  [
    presetEnv,
    {
      targets: {
        electron: 5,
      },
      modules: keepModules ? "false" : "commonjs"
    },
  ],
  presetReact,
  presetFlow
];

let plugins = [
  pluginProposalFunctionBind,

  pluginProposalExportDefaultFrom,
  pluginProposalLogicalAssignmentOperator,
  [pluginProposalOptionalChaining, { loose: false }],
  [pluginProposalPipelineOperator, { proposal: "minimal" }],
  [pluginProposalCoalescingOperator, { loose: false }],
  pluginProposalDoExpressions,

  [pluginProposalDecorators, { legacy: true }],
  pluginProposalFunctionSent,
  pluginProposalExportNameSpaceFrom,
  pluginProposalNumericSeperator,
  pluginProposalThrowExpressions,

  pluginProposalImportMeta,
  [pluginProposalClassProperties, { loose: true }],
  pluginProposalJSONStrings,
];


// transform modules (e.g when without Rollup)
if (!keepModules) {
  plugins.push(...[
      pluginTransformModulesCommonJS,
      pluginSyntaxDynamicImport,
      [pluginAddModuleExports, {addDefaultProperty: false}] // atom needs this
  ]);
}


module.exports = () => {return {
  presets: presets,
  plugins: plugins,
  exclude: "node_modules/**",
  sourceMap: "inline",
};}
