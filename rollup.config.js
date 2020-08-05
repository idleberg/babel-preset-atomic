import { createPlugins } from "rollup-plugin-atomic"

const plugins = createPlugins(["js", "json"])

export default [
  {
    input: "index.js",
    output: [
      {
        dir: "dist",
        format: "cjs",
        sourcemap: true,
      },
    ],
    external: [],
    plugins: plugins,
  },
]
