const Discord = require("discord.js");

const Table = require("../index.js");

module.exports = {
  name: "guildDelete",
  execute(guild, client) {
    Table.Servers.destroy({ where: { server_id: guild.id } }).then(() => {
      console.log(`Left server ${guild.name}`);
    });
  }
}
