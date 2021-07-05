const Discord = require("discord.js");

const Table = require("../index.js");
const embed = require("../embeds.js");

const { prefix, usage, color } = require("../config.json");

module.exports = {
  name: "erase",
  aliases: ["delete"],
  usage: `${prefix}${usage.erase}`,
  description: "Erases your ACNH Simulator data.",
  execute(msg, args, client) {
    Table.Users.destroy({ where: { user_id: msg.author.id.toString() } }).then(user => {
      if (!user) return embed.NORMAL("ACNH Simulator :leaves:", "Your data could not be deleted.", msg.channel);
      embed.NORMAL("ACNH Simulator :leaves:", `Your data has been erased, ${msg.author.toString()}!`, msg.channel);
    }).catch(error => console.error(error));
  }
}
