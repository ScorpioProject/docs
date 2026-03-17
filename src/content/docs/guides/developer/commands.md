---
title: Commands
description: Create and register your own discord commands
---

For creating custom discord commands, including slash commands or context menus, you can use `Command` class exported
from `src/handlers/commands.js`.

## Create your command
To create a command, create a new file where you will place its code.
:::tip
It's a good practise to name your command files the same as their name.
:::

### Using command builders
For ScorpioBot commands, we support using [SlashCommandBuilder](https://discord.js.org/docs/packages/discord.js/14.25.1/SlashCommandBuilder:Class)
or [ContextMenuCommandBuilder](https://discord.js.org/docs/packages/discord.js/14.25.1/ContextMenuCommandBuilder:Class) depending on
your preference and planned use.

<details>
<summary>Difference between SlashCommands and ContextMenus</summary>
While slash commands are executed by typing a command from message input, 
context menu is executed by right-clicking a user or message.

That means, that context menu's only argument is the message or user it from executed from.
</details>

```ts title="ping.ts"
import { SlashCommandBuilder } from "discord.js";

const commandData = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Ping pong")
  .setContexts(InteractionContextType.Guild);
```

### Add code to execute
In order to add code, that will be executed after running the command, use the `Command` class.

```ts title="ping.ts" {8-10}
import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../../handlers/commands.js";

const commandData = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Ping pong")
  .setContexts(InteractionContextType.Guild);
const pingCommand = new Command(commandData, async (client, interaction) => {
  await interaction.reply("pong");
});
export default pingCommand;
```

In the function provided to the `Command` class you should somehow **respond** to the Discord integration. 
You can use `interaction.reply()` function for that.

## Registering your command
After you are done with implementing your command, you need to **register it**. You could notice, that we are exporting the `pingCommand`
containing our command's code.
This exported command should be placed in the module index file, as shown below.
```ts title="index.ts" {7} ins="pingCommand"
import pingCommand from "./commands/ping.js";

const moduleData = {
  /** Events */
  events: [],
  /** Commands */
  commands: [pingCommand],
  /** Config files */
  configs: [],
  /** Language */
  languages: [],
};

export default moduleData;
```

:::tip
The order in which you place your commands in the array, is the same as in which they will be loaded. In most cases, there shouldn't be any difference.
:::