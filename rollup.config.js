import alias from "@rollup/plugin-alias"
import typescript from "@rollup/plugin-typescript"
import { nodeResolve } from "@rollup/plugin-node-resolve"

module.exports = {
	input: "src/index.tsx",
	output: {
		file: "dist/bundle.js",
		format: "iife",
	},
	plugins: [
		nodeResolve(),
		typescript(),
		alias({
			entries: [
				{ find: "react", replacement: "preact/compat" },
				{ find: "react-dom", replacement: "preact/compat" },
			],
		}),
	],
}
