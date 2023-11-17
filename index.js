    const { Client, GatewayIntentBits } = require("discord.js");
    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v9");


    const client = new Client({ intents: [GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages] });

    require("dotenv").config();
    const TOKEN = process.env.BOT_TOKEN;

    client.once("ready", () => {
    console.log("Logged in as ${client.user.tag}!");
    });

    client.login(TOKEN);

    const fs = require("fs");
    const { Collection } = require("discord.js");
    client.commands = new Collection();
    const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    }

    client.on("messageCreate", async (message) => {
    if (!message.content.startsWith("s!") || message.author.bot) return;

    const args = message.content.slice("s!".length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        await message.reply("There was an error trying to execute that command!");
    }
    });

    const commands = client.commands.map((command) => command.data.toJSON());

    const rest = new REST({ version: "10" }).setToken(TOKEN);

    (async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(
        Routes.applicationGuildCommands(client.user.id, "892282713762054144"),
        { body: commands }
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
    })();
