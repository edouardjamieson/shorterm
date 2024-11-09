const fs = require("fs");
const prompts = require("@inquirer/prompts");

function getCurrentVersion() {
	// Get complete export string
	const exportString = fs.readFileSync(__dirname + "/../cli/version.ts", { encoding: "utf-8" });
	// Extract version number with regex
	const matches = exportString.match(/"(.*)"/);

	const version = matches[1];
	return version;
}

async function upgradeCurrentVersion() {
	// Get current version
	const v = getCurrentVersion();

	// Ask type of upgrade
	const upgradeType = await prompts.select({
		message: "Select type of upgrade",
		choices: [
			{
				value: "fix",
				name: "Fix (x.x.1)",
			},
			{
				value: "minor",
				name: "Minor (x.1.x)",
			},
			{
				value: "major",
				name: "Major (1.x.x)",
			},
		],
	});

	let versions = v.split(".").map((i) => parseInt(i));

	switch (upgradeType) {
		case "fix":
			versions[2]++;
			break;
		case "minor":
			versions[1]++;
			versions[2] = 0;
			break;
		case "major":
			versions[0]++;
			versions[1] = 0;
			versions[2] = 0;
			break;
		default:
			break;
	}

	// Write in export file
	fs.writeFileSync(__dirname + "/../cli/version.ts", `export const CURRENT_VERSION = "${versions.join(".")}";`, { encoding: "utf-8" });

	// Write in package JSON
	let packageJson = fs.readFileSync(__dirname + "/../../package.json", { encoding: "utf-8" });
	packageJson = packageJson.replace(`"version": "${v}"`, `"version": "${versions.join(".")}"`);
	fs.writeFileSync(__dirname + "/../../package.json", packageJson, { encoding: "utf-8" });

	console.log(`Upgraded version to ${versions.join(".")}`);
}

upgradeCurrentVersion();
