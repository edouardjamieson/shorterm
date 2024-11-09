import { input } from "@inquirer/prompts";
import chalk from "chalk";
import { Command } from "commander";
import { displayTitle } from "src/cli/helpers";
import { addShortcut, getShortcuts } from "src/cli/shortcuts";

export default class CommandAdd extends Command {
	constructor() {
		super();

		this.name("add");
		this.description(chalk.blue("Add a shortcut"));
		this.action(this.run.bind(this));
	}

	async run() {
		displayTitle();

		const cmd = await input({ message: chalk.bold("Command :") });
		const name = await input({
			message: chalk.bold("Shortcut :"),
			validate: (val) => {
				if (!val.match(/^[a-z0-9]+(?:(?:-|_)+[a-z0-9]+)*$/m))
					return "Value can only contain lowercase letters, numbers, hyphens and underscores.";
				return true;
			},
		});

		const added = addShortcut(cmd.trim(), name.trim());

		console.log("\n");
		if (added) console.log(chalk.green("Added shortcut !"));
		else console.log(chalk.red("Shortcut already exists !"));
	}
}
