---
title: Language files
description: Add language files to your module
---

If you have a multilingual community or want to be able to easily change messages sent with your addon, you may be
interested in the **language files** system.

You can do it with `language` class exported from `src/handlers/languages.js`.

## About language files
Language files system is heavily based on the config system. In fact, the language system code was written by 
modifying the language system code.

All module's language files are kept under `language/` folder and are categorized by module.
:::tip[Example]
If your module is called `core`, language files for it, can be found under `language/core/`
:::
The language files are stored as **YAML files** which allows for easy editing even for not advanced users.

### Multilanguage structure
Unlike configuration files, language files are also categorized by **language code**. This allows to store multiple versions
of a single language file for each supported language.
:::tip[Example]
Inside the `language/core/` there is `en-US` and other supported languages like `pl`, `de` or `fr`.
:::

### Language configuration
For language configuration, check out the `.env` file.
```dotenv
# Language settings
BASE_LANGAGE=en-US
AVAILABLE_LANGUAGES=en-US,pl
```
There are two available values:
- `BASE_LANGAGE` which is a **single** language code as the **default**
- `AVAILABLE_LANGUAGES` is a **list** of language codes, separated by comas which tells the bot which languages are supported

For available locales list, check out [discord.js docs](https://discordjs.dev/docs/packages/discord.js/main/Locale:Enum).
You need to use the **values** like `en-US`, `pl` etc.

### Multilanguage workflow
Message language is based on the locale of their Discord Client. If they have `English, US` selected, their locale will be `en-US`.
If the module properly supports language files, and it's listed as available in the `.env` file, they will see all commands in their language
and responses from the bot for their interactions will also be sent based on that locale.

If user's locale is not listed as available, the system will fall back to the default language as stated in the `.env` file.

## Creating language files
To create a language file, create a new file where you will place its code.
:::tip
It's a good practise to name the file the same as the language name.
:::
```ts title="commands.ts"
const commandsLanguage = new Language("commands", {
  ping: {
    name: "ping",
    description: "Ping pong",
    response: "pong",
  },
});
export default commandsLanguage;
```

In your language file, you can use strings, booleans, arrays or even objects. Everything will be automatically transformed
into YAML while saving and from YAML when loading.

### Adding comments
You can also add comments inside your language file by using special keys like `~X`.
```ts title="commands.ts" {2} ins=""~01": "Ping command translation","
const commandsLanguage = new Language("commands", {
  "~01": "Ping command translation",
  ping: {
    name: "ping",
    description: "Ping pong",
    response: "pong",
  },
});
export default commandsLanguage;
```

This line will be transformed into a YAML comment inside your language file and not a proper value.

:::danger
After generation, you will not be able to get comments from the generated YAML file with code.
:::

## Registering your language file
After you are done with writing your language file, you need to **register it**. You could notice, that we are exporting the `commandsLanguage`
containing our language file code.
```ts title="index.ts" {11} ins="[commandsLanguage]"
import commandsLanguage from "./languages/commands.js";

const moduleData = {
  /** Events */
  events: [],
  /** Commands */
  commands: [],
  /** Config files */
  configs: [],
  /** Language */
  languages: [commandsLanguage],
};

export default moduleData;
```

:::tip
The order in which you place your languages in the array, is the same as in which they will be loaded. In most cases, there shouldn't be any difference.
:::

## Using language files
After adding your language file to the module index, you can use it by importing it and using `commandsLanguage.get("locale")` method.
```ts title="ping.ts" {9}
import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../../handlers/commands.js";
import commandsLanguage from "../languages/commands.js";

const commandData = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Ping pong")
const pingCommand = new Command(commandData, async (client, interaction) => {
  await interaction.reply(commandsLanguage.get(interaction.locale).ping.response);
});
export default pingCommand;
```

As you can see, we are using `commandsLanguage.get(interaction.locale)` to get a language for the user's locale.

### Adding localizations to commands
Discord API supports adding multiple command names and descriptions for different languages. You can do that by using 
`commandData.setNameLocalizations()` and `commandData.setDescriptionLocalizations()` with language `commandsLanguage.getAll("key")`.

By using `commandsLanguage.getAll("key")` with the `key` being the object key for which you want to get all language options, 
you will get an object required to properly with localizations with `discord.js` builders.

```ts title="ping.ts" {3,6-9}
import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../../handlers/commands.js";
import commandsLanguage from "../languages/commands.js";

const commandData = new SlashCommandBuilder()
  .setName(commandsLanguage.get().ping.name)
  .setNameLocalizations(commandsLanguage.getAll("ping.name"))
  .setDescription(commandsLanguage.get().ping.description)
  .setDescriptionLocalizations(commandsLanguage.getAll("ping.description"))
const pingCommand = new Command(commandData, async (client, interaction) => {
  await interaction.reply(commandsLanguage.get(interaction.locale).ping.response);
});
export default pingCommand;
```

By using this option, users with different client locales will see different command name and description suited to their language.

:::tip
You can notice, that we are using `commandsLanguage.get()` without a locale value.

If you don't provide user's locale in the function, the system will return a value for the **default language**.
:::