import { input } from "@inquirer/prompts";
import chalk from "chalk";
import { Command } from "commander";
import { displayTitle } from "src/cli/helpers";
import { addShortcut, getShortcuts } from "src/cli/shortcuts";

export default class CommandList extends Command {
	constructor() {
		super();

		this.name("l");
		this.description(chalk.blue("List saved shortcuts"));
		this.action(this.run.bind(this));
	}

	async run() {
		displayTitle();

		const shortcuts = getShortcuts();

		// If no shortcuts
		if (shortcuts.length == 0) {
			console.log(chalk.yellow("You have not saved any shortcuts yet !"));
			return;
		}

		// Display shortcuts
		shortcuts
			.sort((a, b) => a.name.localeCompare(b.name))
			.forEach((s) => {
				console.log(`${chalk.magenta.bold(s.name)}${chalk.reset(` : ${s.cmd}`)}`);
			});
	}
}
