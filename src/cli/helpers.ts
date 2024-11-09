import chalk from "chalk";
import { exec } from "child_process";

export function displayTitle() {
	console.clear();
	console.log(chalk.bgMagenta.white.bold(" SHRTRM 🧠 "));
	console.log("\n");
}

export async function execute(cmd: string) {
	return new Promise((resolve, reject) => {
		exec(`${cmd}`, (error, stdout, stderr) => {
			if (error) reject(stderr);
			else resolve(stdout);
		});
	});
}
