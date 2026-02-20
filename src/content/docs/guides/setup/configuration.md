---
title: Configuration
description: Configure your bot and boot it for the first time
---

After downloading the files and preparing the environment you can proceed with configuration. Basic configuration options like
the token, guild or database are set in `.env` file.

:::note
All the custom configuration like modules config and language files are handled by generated YML files. The `.env` file
contains only some basic options to get the bot running.
:::

### Basic configuration
To configure the bot, rename the `.env.example` to `.env` and configure `TOKEN` and `GUILD_ID` options.
```dotenv
# Basic bot configuration
TOKEN=your-bot-token-you-saved-ealier
GUILD_ID=id-of-your-guild
```

:::tip[Getting Guild ID]
In order to get your Guild ID:
1. Open your Discord client
2. Go to **Settings** > **Advanced**
3. Enable the **Developer Mode**
4. Right-click your guild avatar
5. Click **Copy Server ID**
6. Paste it in the configuration file
:::

### Database configuration
For some modules, it may be required to use a database for data storage. By default, the bot is bundled with **SQLite** (`better-sqlite3`)
for a local, file-based database, but you can configure it to use other drivers.

Currently supported drivers:
- **SQLite** (`sqlite3` or `better-sqlite3`)
- **PostgreSQL** (`pg` or `pg-native`)
- **MySQL** (`mysql` or `mysql2`)
- **OracleDB** (`oracledb`)
- **AzureSQL** (`tedious`)

:::tip
Most managed hosting providers usually offer a free **MySQL database**, which you can configure to be used for data storage.
:::

### Debug mode
If you are a developer or just trying to debug an issue with the bot, you can set `DEBUG` to `true` to show debug logs.
While most messages and errors are always displayed, some module developers may use this option for improved logging experience.