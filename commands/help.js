const Discord = require('discord.js');

const { prefix, color, usage } = require('../config.json');
const { titles, error, warning } = require('../lines.json');

const embed = require('../embeds.js');

module.exports = {
  name: 'help',
  description: 'Lists all commands and their descriptions',
  aliases: ['commands'],
  usage: `\`${prefix}${usage.help[0]}\n${prefix}${usage.help[1]}\``,
  cooldown: 3,
  execute(msg, args) {
    const data  = [];
    const { commands } = msg.client;

    // send a list of all commands for help if there are no other arguments
    if (!args.length) {
      const embed = new Discord.MessageEmbed()
                              .setColor(color.embed)
                              .setTitle(titles.HELP)
                              .setDescription(`(You can send \`${prefix}help [command name]\` to get info on a specific command)`);

      for (const cmd of commands.values()) {
        embed.addField(`\`${cmd.name}\``, cmd.description);
      }

      return (msg.channel.send(embed))
        .then()
        .catch(error => {
          console.error(`Could not send message to ${msg.author.tag}.\n`, error);
          return embed.ERROR(error.failedHelpMessage, msg.channel);
        })
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    // if an invalid command is given as an argument
    if(!command) return embed.WARNING(warning.INVALID_COMMAND, msg.channel);

    const detailedEmbed = new Discord.MessageEmbed()
                                     .setColor(color.embed)
                                     .setTitle(`ACNH Simulator: Help >> ${command.name}`)

    if (command.usage) detailedEmbed.addField("Usage", `\`${prefix} ${command.name} ${command.usage}\``, true);
    if (command.aliases) detailedEmbed.addField("Aliases", command.aliases.join(', '), true);
    if (command.description) detailedEmbed.setDescription(command.description);

    detailedEmbed.addField("Cooldown", `${command.cooldown || 3} second(s)`);

    return msg.channel.send(detailedEmbed);
  }
}
