//   ________  ___  ___  ________  ________  _________  _______   ________  _____ ______
//  |\   ____\|\  \|\  \|\   __  \|\   __  \|\___   ___\\  ___ \ |\   __  \|\   _ \  _   \
//  \ \  \___|\ \  \\\  \ \  \|\  \ \  \|\  \|___ \  \_\ \   __/|\ \  \|\  \ \  \\\__\ \  \
//   \ \_____  \ \   __  \ \  \\\  \ \   _  _\   \ \  \ \ \  \_|/_\ \   _  _\ \  \\|__| \  \
//    \|____|\  \ \  \ \  \ \  \\\  \ \  \\  \|   \ \  \ \ \  \_|\ \ \  \\  \\ \  \    \ \  \
//      ____\_\  \ \__\ \__\ \_______\ \__\\ _\    \ \__\ \ \_______\ \__\\ _\\ \__\    \ \__\
//     |\_________\|__|\|__|\|_______|\|__|\|__|    \|__|  \|_______|\|__|\|__|\|__|     \|__|
//     \|_________|
//
//

import { program } from "commander";
import CommandAdd from "./commands/add";
import { execShortcut } from "./cli/shortcuts";
import CommandList from "./commands/list";
import CommandListExec from "./commands/listexec";
import CommandDelete from "./commands/delete";
import { CURRENT_VERSION } from "./cli/version";

// ====================================================================
// COMMANDS
// ====================================================================

// Add
program.addCommand(new CommandAdd());
// List
program.addCommand(new CommandList());
// List exec
program.addCommand(new CommandListExec());
// Delete
program.addCommand(new CommandDelete());

// ====================================================================
// CATCH ALL (RUN SHORTCUTS)
// ====================================================================

program.on("command:*", (command, args: string[]) => {
	// If command exists bail
	if (program.commands.find((c) => c.name == command[0])) return;

	execShortcut(command);
});

// ====================================================================
// PARSING
// ====================================================================

program.version(CURRENT_VERSION);
program.parse(process.argv);
