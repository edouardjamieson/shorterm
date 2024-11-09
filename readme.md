![Bashnode](https://bashnode.dev/favicon.png)

# Official Bashnode CLI

[Official website](https://bashnode.dev)

Welcome to the official Bashnode CLI npm package. This package serves as the bridge between your custom built CLIs and their execution. Use this package to run your flows.

This package **is not** meant to be installed via the `npm install` command. Instead, this package should always be ran using the `npx bashn@latest <args>` command.

## Available commands

All commands should start with `npx bashn@latest`. It is important to use the `@latest` version to benefit from the latest features and security improvments.

Before an `npx` installation, the CLI will ask you to confirm the temporary installation of the package, to skip this step, you can add the `--yes` flag (eg: `npx --yes bashn@latest <args>`).

### Run flow

> npx bashn@latest @team/flow

Replace `team` with your team handle, and `flow` with your desired flow handle.

### Log into your Bashnode account

> npx bashn@latest login

Some flows will require you to have a valid Bashnode account. Follow the steps indicated on screen to link your account.

### Log out of your Bashnode account

> npx bashn@latest logout

## Feedback / bug report

Found a bug in the CLI or website ? You can report it [here](https://bashnode.dev/dashboard/bug-report).

If you simply wish to give us some feedback on your experience, you can do so [here](https://bashnode.dev/dashboard/feedback).

**A Bashnode account is required to report bugs or give feedback**

---

Thank you for trusting us!

\- The Bashnode team
