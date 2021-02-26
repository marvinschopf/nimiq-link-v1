import alias from "@rollup/plugin-alias"
import typescript from "@rollup/plugin-typescript"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import html from "@rollup/plugin-html"

module.exports = {
	input: "src/index.tsx",
	treeshake: true,
	preserveEntrySignatures: false,
	output: {
		sourcemap: false,
		format: "iife",
		name: "app",
		dir: "dist",
		entryFileNames: "bundle.[hash].js",
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
		html({
			fileName: "index.html",
			meta: [
				{
					charset: "utf-8",
				},
				{
					name: "viewport",
					content: "width=device-width,initial-scale=1.0",
				},
			],
			title: "NIMIQ.link",
		}),
	],
}
