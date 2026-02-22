---
title: Event listeners
description: Execute code based on Discord or ScorpioBot system events.
---

For executing custom code after something in your guild happens, you can use `EventListener` class exported from `src/handlers/events.js`.

## Create your event listener
To create an event listener, create a new file where you will place its code.
:::tip
It's a good practise to name your event files the same as the event you are responding to.
:::

```ts title="interactionCreate.ts" "Events.InteractionCreate"
import { Events } from "discord.js";
import { EventListener } from "../../../handlers/events.js";

const interactionCreateEvent = new EventListener(
  Events.InteractionCreate,
  (client, interaction) => {
    // The code to be executed on interaction create
  }
);
export default interactionCreateEvent;
```

### Available events
You can notice, that we are using `Events` property for the event name. It's a value exported from `discord.js` package 
will all the available events you can listen to. You can check out the full event list [here](https://discord.js.org/docs/packages/discord.js/main/Events:Enum).

However, ScorpioBot also adds some custom events with the `ScorpioEvents` property, including:
- `ScorpioEvents.ModuleLoaded` triggered after **any** module has been loaded
- `ScorpioEvents.BotReady` triggered after the ScorpioBot has **fully started**
- `ScorpioEvents.FileReloaded` triggered after reloading a config or language file of **any** module

Most of these events come with their arguments, which should be shown by your IDE.

:::tip
The `ScorpioEvents` property is exported from the same file as `EventListener`.
:::
:::danger[Do not use default client ready event]
If you want to execute code after the bot has been loaded, you should use `ScorpioEvents.BotReady` and not `Events.ClientReady`.

The `ScorpioEvents.BotReady` is triggered **after** `Events.ClientReady`, when the startup banner is shown.
:::

## Registering your event listener
After you are done with implementing your listener, you need to **register it**. You could notice, that we are exporting the `interactionCreateEvent`
containing our event listener.
This exported event should be placed in the module index file, as shown below.
```ts title="index.ts" {5} ins="interactionCreateEvent"
import interactionCreateEvent from "./events/interactionCreate.js";

const moduleData = {
  /** Events */
  events: [interactionCreateEvent],
  /** Commands */
  commands: [],
  /** Config files */
  configs: [],
  /** Language */
  languages: [],
};

export default moduleData;
```

:::tip
The order in which you place your events in the array, is the same as in which they will be loaded. In most cases, there shouldn't be any difference.
:::