const esbuild = require("esbuild");

esbuild
	.build({
		allowOverwrite: true,
		write: true,
		entryPoints: ["./src/index.ts"],
		outfile: "bin/index.js",
		format: "cjs", //format option set to cjs makes all imports common-js style
		bundle: true,
		platform: "node",
		minify: true,
	})
	.then(() => {
		console.log("Done!");
	});
