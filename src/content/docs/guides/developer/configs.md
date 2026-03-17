---
title: Config files
description: Add configuration files to your module
---

If you plan to release your module publicly or just want to be able to easily change its settings without modifying the code
you can integrate **configuration files** into your module.

You can do it with `Config` class exported from `src/handlers/configs.js`.

## About configuration files
All module's configuration files are kept under `config/` folder and are categorized by module.
:::tip[Example]
If your module is called `core`, config files for it, can be found under `config/core/`
:::

The configuration files are stored as **YAML files** which allows for easy editing even for not advanced users.

## Creating configuration files
To create a config file, create a new file where you will place its code.
:::tip
It's a good practise to name the file the same as the config name.
:::
```ts title="general.ts"
const generalConfig = new Config("general", {
  string: "value",
  list: ["arg1", "arg2", "arg3"],
  object: {
    key: "value"
  }
});
export default generalConfig;
```

In your config file, you can use strings, booleans, arrays or even objects. Everything will be automatically transformed
into YAML while saving and from YAML when loading.

### Adding comments
You can also add comments inside your config file by using special keys like `~X`.
```ts title="general.ts" {2} ins=""~01": "Example comment","
const generalConfig = new Config("general", {
  "~01": "Example comment",
  string: "value",
  list: ["arg1", "arg2", "arg3"],
  object: {
    key: "value"
  }
});
export default generalConfig;
```

This line will be transformed into a YAML comment inside your config file and not a proper value.

:::danger
After generation, you will not be able to get comments from the generated YAML file with code.
:::

## Registering your config
After you are done with writing your config, you need to **register it**. You could notice, that we are exporting the `generalConfig`
containing our config's code.
```ts title="index.ts" {9} ins="generalConfig"
import generalConfig from "./configs/general.js";

const moduleData = {
  /** Events */
  events: [],
  /** Commands */
  commands: [],
  /** Config files */
  configs: [generalConfig],
  /** Language */
  languages: [],
};

export default moduleData;
```

:::tip
The order in which you place your configs in the array, is the same as in which they will be loaded. In most cases, there shouldn't be any difference.
:::

## Using config files
After adding your config file to the module index, you can use it by importing it and using `.get()` method.
```ts
import generalConfig from "./configs/general.js";
const result = generalConfig.get().string;
console.log(result)
```

In this code, if config hasn't been changed, the `result` variable will have `value` string as its value.