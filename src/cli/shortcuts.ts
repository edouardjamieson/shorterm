// @ts-ignore
import Conf from "conf";
import { displayTitle, execute } from "./helpers";
import chalk from "chalk";

export type Shortcut = {
	cmd: string;
	name: string;
};

export const _config = new Conf({ projectName: "shorterm" });

export function getShortcuts() {
	const st = _config.get("shortcuts", "[]");
	return JSON.parse(st as string) as Shortcut[];
}

export function getShortcut(name: string) {
	const shortcuts = getShortcuts();
	return shortcuts.find((s) => s.name == name) ?? null;
}

export function addShortcut(cmd: string, name: string) {
	const shortcuts = getShortcuts();

	// Check if shortcut already exists
	if (shortcuts.find((s) => s.name == name)) return false;

	// Add shortcut
	shortcuts.push({ cmd, name });

	_config.set("shortcuts", JSON.stringify(shortcuts));
	return true;
}

export function execShortcut(name: string) {
	// Check if shortcut exists
	const shortcut = getShortcut(name);
	if (!shortcut) {
		displayTitle();
		console.log(chalk.red("Command or shotcut does not exist."));
		return;
	}

	// Run command
	execute(shortcut.cmd)
		.then((out) => {
			console.log(out);
		})
		.catch((err) => {
			displayTitle();
			console.log(chalk.red(`There was an error while executing shortcut "${shortcut.name}"`));
			console.log(err);
		});
}

export function deleteShortcut(name: string) {
	// Check if shortcut exists
	const shortcut = getShortcut(name);
	if (!shortcut) return false;

	// Remove shortcut
	const shortcuts = getShortcuts();
	shortcuts.splice(shortcuts.indexOf(shortcuts.find((s) => s.name == name)!), 1);

	// Save
	_config.set("shortcuts", JSON.stringify(shortcuts));
	return true;
}
