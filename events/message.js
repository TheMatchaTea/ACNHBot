const Discord = require("discord.js")
const dotenv = require("dotenv");

const { prefix, color } = require('../config.json');
const { titles, error } = require('../lines.json');

const embed = require('../embeds.js');

dotenv.config();

function getCommand(args, msg, client) {
  const commandName = args.shift().toLowerCase();

  return client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
}

function handleCooldown(msg, client, command) {
  const { cooldowns } = client;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(msg.author.id)) {
    const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return msg.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  }

  timestamps.set(msg.author.id, now);
  setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
}

module.exports = {
  name: "message",
  execute(msg, client) {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);

    const command = getCommand(args, msg, client);

  	if (!command) return;

    handleCooldown(msg, client, command);

    try {
      command.execute(msg, args);
    } catch (consoleError) {
      console.error(`${error.message.code}: ${consoleError}`);
      return embed.ERROR(error.message, msg.channel);
    }
  }
}
