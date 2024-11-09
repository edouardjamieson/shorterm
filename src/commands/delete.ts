import { input, select, checkbox } from "@inquirer/prompts";
import chalk from "chalk";
import { Command } from "commander";
import { displayTitle } from "src/cli/helpers";
import { addShortcut, deleteShortcut, execShortcut, getShortcuts } from "src/cli/shortcuts";

export default class CommandDelete extends Command {
	constructor() {
		super();

		this.name("delete");
		this.description(chalk.blue("Delete selected shortcuts"));
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

		const selected = await checkbox({
			message: `${chalk.magenta("Select shortcut(s) to delete\n")}`,
			choices: shortcuts.sort((a, b) => a.name.localeCompare(b.name)).map((s) => ({ name: s.name, value: s.name })),
		});

		selected.forEach((s) => {
			// Delete
			deleteShortcut(s);
		});

		console.log(chalk.green(`Deleted ${selected.length} shortcut(s) !`));
	}
}
