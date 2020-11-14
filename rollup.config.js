import typescript from "@rollup/plugin-typescript"
import eslint from "@rollup/plugin-eslint"
import pkg from "./package.json"

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  output: {
    dir: "./lib",
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [typescript(), eslint()],
}
