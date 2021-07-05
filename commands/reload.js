const Discord = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');

const { prefix, color } = require('../config.json');
const { titles, error, warning } = require ('../lines.json');

const embed = require('../embeds.js');

dotenv.config();

module.exports = {
  name: "reload",
  aliases: ["refresh", "restart"],
  description: "Reloads a command",
  args: true,
  execute(msg, args) {
    // if i (tea) am not the message author, do not run this command
    if (msg.author.id !== process.env.MY_ID) return;

    // retrieve the actual command based on potential aliases
    if (!args[0]) return embed.WARNING(`Please give a command to reload, ${msg.author}!`, msg.channel);

    const commandName = args[0].toLowerCase();
		const command = msg.client.commands.get(commandName)
			|| msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // if the command does not exist
		if (!command) return embed.WARNING(`There is no command with name or alias \`${commandName}\`, ${msg.author}!`, msg.channel);

    const commands = fs.readdirSync("./commands");

    delete require.cache[require.resolve(`./${command.name}.js`)];

    try {
    	const newCommand = require(`./${command.name}.js`);
    	msg.client.commands.set(newCommand.name, newCommand);
      return embed.SUCCESS(`Command \`${newCommand.name}\` was reloaded!`, msg.channel);
    } catch (error) {
    	console.error(error);
      return embed.ERROR(error.message, msg.channel);
    }
  }
}
