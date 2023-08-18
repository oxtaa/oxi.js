<p align="center">
  <a href="https://oxi.js.org">
    <img width="600" src="https://media.discordapp.net/attachments/1026680546513928265/1137058090982850651/Logo.png?width=1025&height=351" alt="oxijs">
  </a>
</p>

<div align="center">

**Fixed-like version of aoi.js v5.5.5**

[NPM](http://npmjs.org/package/oxi.js) **|** [Docs](https://oxi.js.org)
    
</div>

## Installation

```bash
npm install oxi.js@latest
```

## Setup

```javascript
const oxi = require("oxi.js");

const client = new oxi.Bot({
    token: "Your token",
    prefix: "Your prefix",
    intents: ["GUILDS", "GUILD_MESSAGES"]
});

client.onMessage();

client.command({
  name: "ping",
  code: `Pong! $pingms`
}); // Command example
```

### Function usage Example

```
$authorID - Returns the user ID who executed the function
```

### How does it work?

Simple! By using `$` as a sense of a function to execute, it'll be run by a command. If you use `$` after the function name, and its additional fields _(if any)_, it'll work as intended.

## Events

This helps developers create certain events to occur within their Client. There are several events within oxi.js, an example event is when the Client is ready:

```js
client.readyCommand({ // Event Command
    channel: "", // The channel for logging (Optional)
    code: `$log[The bot is ready!]` // This will log to the console "The bot is ready!"
})
```

<div align="center">

**Made by [OxiProjects](https://github.com/oxijs)**
    
</div>