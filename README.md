<p align="center">
  <a href="https://aoi.js.org">
    <img width="400" src="https://github.com/aoijs/website/blob/master/assets/images/aoijs-new.png?raw=true" alt="aoijs">
  </a>
</p>

<h1 align="center">oxi.js</h1>

<div align="center">

Fixed-like version 5.5.5 of [aoi.js](https://www.npmjs.com/package/aoi.js)

**Based on aoi.js v5.5.5, all credits go to Leref and his contributors.**

[NPM](http://npmjs.org/package/aoi.js) **|** [Docs](https://docs.oxijs) **|** [Original aoi.js](https://npmjs.com/package/aoi.js)
    
</div>

## Table of Contents
- [Features](#features) 
- [Installation](#installation)
- [Setup](#setup)
- [Events](#events)
- [Disclaimer](#disclaimer)
- [Links](#links)

## Features

- Built-in support of [database](https://www.npmjs.com/package/dbdjs.db) by default and ready for multipurpose.
- Simple to learn, all in string-based and compact.
- Support of extensions available to be used by the community.

## Installation

**node.js 16.6.0 or newer is required.**  


```bash
npm install oxi.js
```

```bash
yarn add oxi.js
```

## Setup

```javascript
const oxi = require("oxi.js")

const bot = new oxi.Bot({
token: "TOKEN", // Your Discord bot token
prefix: "!", // You can change this
intents: ["GUILDS", "GUILD_MESSAGES"] // Intents
})

// Events
bot.onMessage()

// CMD Example
bot.command({
name: "ping",
code: `Pong! $pingms`
})
```

### Function usage Example

```
$authorID - This will return the user ID who executed the function
```

### How does it work?

Simple! By using `$` as a sense of a function to execute, it'll be run by a command.
If you use `$` after the function name, and its additional fields, (if there are any) it'll work as intended by it function.

## Events

This helps developers create certain events to occur within their Client. There are several events within oxi.js _(aoi.js)_, an example event is when the Client is ready and logged onto the API.

```javascript
bot.readyCommand({ //Event Command
    channel: "", // The channel for logging (Optional)
    code: `$log[The bot is ready!]` // This will log to the console "The bot is ready!"
})
```

## Database

oxi.js includes the original database of aoi.js, [dbdjs.db](https://npmjs.com/package/dbdjs.db) _(now with v6 default database changed to [aoi.db](https://npmjs.com/package/aoi.db))_. oxi.js has support for another databases _(just like the original v5.5.5 does)_. Below is an example using the default database.

```javascript

const oxi = require("oxi.js")

const bot = new oxi.Bot({
token: "TOKEN", // Your Discord bot token
prefix: "!", // You can change this
intents: ["GUILDS", "GUILD_MESSAGES"] // Intents
  database: { // This will change the database to any other that you want, not required!
    db: require("dbdjs.db"),
    type: "dbdjs.db",
    path: "./database/",
    tables: ["main"],
  }
})
```
This is clearly optional, if you want to keep your database by default, don't mind this section.

## Music Integration

Here's the music integration! oxi.js **only supports `@akarui/aoi.music` v1.2.6**, _just as aoi.js v5.5.5 does_
```bash
npm install @akarui/aoi.music@1.2.6
```
Use this on your precaution!

Do you want to make your Discord Bot different from others, possibly with the ability to play/stream music, it's simple and easy to use!

```
$playTrack[type;name] - To play a track from the available third parties supported. 
```
More info in the [official aoi.js documentation](https://aoi.js.org/5.5.5/docs/)


## Disclaimer
    
oxi.js, and _aoi.js_ are not affiliated or associated with Discord or any other services.

**This is _not_ an official release of aoi.js**

> aoi.js is managed by [Akarui Development Team](https://discord.gg/HMUfMXDQsV), I'm just modifying the original code from an old version.   
    
## Akarui and aoi.js Links
- [aoi.js Website](https://aoi.js.org)
- [aoi.js NPM page](https://www.npmjs.com/package/aoi.js)
- [aoi.js Github](https://github.com/AkaruiDevelopment/aoi.js)
- [aoi.js Discord Support Server](https://discord.gg/HMUfMXDQsV)
- [aoi.js v5.5.5 Documentation](https://aoi.js.org/5.5.5/docs/)
