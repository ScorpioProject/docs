---
title: First steps
description: Prepare your environment for ScorpioBot module development
---

Module development for ScorpioBot is relatively easy. With a set of development tools you can easily create advanced systems
even with limited knowledge about Discord API.

## Setting up the project
To be able to create modules, you should [build the project from source](/guides/setup/install#building-from-source). This will allow
you to use TypeScript with dynamic types and other integrations built for ScorpioBot.

## Creating new module
As of today, there is no CLI or templates for creating new module, but you can check out the `core` module for reference.

### Module folder
First, create a folder with a `codename` of your module. It should only use lowercase characters and underscores. In this
folder, you will place any files including resources like images that are a part of your module.

### Manifest file
In the created folder, create a `manifest.json` file. Manifest file serves a purpose of module's metadata. It's loaded before
the code itself and can include information about any required dependencies.

```json title="manifest.json"
{
  "name": "Core",
  "codename": "core",
  "description": "The core module for the bot.",
  "author": "Scorpio Team",
  "version": "1.0.0"
}
```

Now, a brief explanation about contents of manifest file:
- **name** is a displayed module name. It can include any readable character and is used only for cosmetic purposes.
- **codename** should be the same as module's folder name. It's used in code for any references including dependencies.
- **description** is a description which is currently not displayed anywhere.
- **author** should be your nickname. It's not only cosmetic but can also be used by our internal systems when publishing your work.
- **version** is supposed to be your module current version. It needs to meet the [SemVer](https://semver.org/) specification since it's used in code.

#### Defining module dependencies
If you plan to use any package not included by default or another module, you can populate the **dependencies** field. It
should be a list of strings in the according format.
- For **npm dependency**, use `npm:dependency@version`, where `dependency` is a package name and `version` is a semver version of the dependency you require
- For **module dependency**, use `module:module@version`, where `module` is the module **codename** and `version` is a semver version of the module you require

### Module index
After creating your manifest file, you need to create the index file with an export of all of you modules commands, events and config files.
```ts title="index.ts"
const moduleData = {
  /** Events */
  events: [],
  /** Commands */
  commands: [],
  /** Config files */
  configs: [],
  /** Language */
  languages: [],
};

export default moduleData;
```

This tells the bot the origin of each registered entry, allowing for partial reloads with the `reload` command.

## Next steps
For creating commands, events and using other functions of the bot, check out other guides.