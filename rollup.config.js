import alias from "@rollup/plugin-alias"
import typescript from "@rollup/plugin-typescript"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import html from "@rollup/plugin-html"
import Handlebars from "handlebars"

import { readFileSync } from "fs"

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
			template: ({ attributes, bundle, files, publicPath, title }) => {
				const template = Handlebars.compile(
					readFileSync("template.handlebars").toString()
				)
				return template({
					files: files,
					bundle: bundle,
					attributes: attributes,
					publicPath: publicPath,
					title: title,
				})
			},
		}),
	],
}