---
title: Discord Developer App
description: Process of setting Discord Developer App for your bot.
---

To app ScorpioBot to your Discord server, you need to create a new Developer App with which you will be interacting when using the bot.

## Creating a Discord Application
You can create new Developer App using [Discord Developer Portal](https://discord.com/developers/applications).
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click on the **New Application** button
3. Enter the name of the app, this **will not** be your bot name, and you can use your guild name here
4. Accept the developer terms and click **Create**

For more details on how to set up your app, you can check out [this guide](https://discordjs.guide/legacy/preparations/app-setup).

## Setting up the Bot user
After you create your app, you can customize your Bot user, by going into **Bot** page within your app, where you can set the:
- **Icon** which is used as the avatar
- **Banner** shown on bot's profile
- **Username** of your bot

## Authorization and intent configuration
Under profile options, you will see **Authorization Flow** and **Privileged Gateway Intents** sections. It's important to:
1. Set **Public Bot** setting to __**unchecked**__
2. Leave **Requires OAuth2 Code Grant** as __**unchecked**__
3. Set all intent options such as **Presence Intent**, **Server Members Intent** and **Message Content Intent** to __**checked**__

:::danger[Ensure everything is properly configured]
Invalid configuration of these options will prevent proper functioning of the bot.
:::

:::note[Why do I need to enable all of these intents?]
Normally, you would only enable the intents that you are actually using. However, since ScorpioBot is designed to be 
fully modular it is configured to use all the intents in case any module requires them.
:::

## Generating a bot token
To get your bot logged in, you need to generate a **bot token**. For that, click a **Reset Token** button and save the
generated token for later.