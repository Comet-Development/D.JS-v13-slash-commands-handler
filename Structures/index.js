const { Client, Collection } = require("discord.js");
const client = new Client({intents: 3641});
const { Token } = require("./config.json");

client.commands = new Collection()

require("./Handlers/Events")(client);
require("./Handlers/Commands")(client);

client.login(Token);