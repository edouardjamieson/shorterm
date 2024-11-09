import { input, select } from "@inquirer/prompts";
import chalk from "chalk";
import { Command } from "commander";
import { displayTitle } from "src/cli/helpers";
import { addShortcut, execShortcut, getShortcuts } from "src/cli/shortcuts";

export default class CommandListExec extends Command {
	constructor() {
		super();

		this.name("le");
		this.description(chalk.blue("Execute shortcut from list"));
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

		const selected = await select({
			message: `${chalk.magenta("Select shortcut to run\n")}`,
			choices: shortcuts.sort((a, b) => a.name.localeCompare(b.name)).map((s) => ({ name: s.name, value: s.name })),
		});

		execShortcut(selected);
	}
}
