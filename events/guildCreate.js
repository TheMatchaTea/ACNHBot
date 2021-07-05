const Discord = require("discord.js");

const Table = require("../index.js");
const embed = require("../embeds.js");

const { titles, error, warning } = require("../lines.json");

function isTodaySunday() {
  let d = new Date();
  if (d.getDay() === 0) {
    return true;
  }
  else {
    return false;
  }
}

function isSellingTurnips() {
  if (isTodaySunday()) {
    return false;
  }
  else {
    return true;
  }
}

function determineTurnipPrices() {
  if (!isSellingTurnips()) return 0;
  return Math.ceil(Math.random() * 650);
}

module.exports = {
  name: "guildCreate",
  execute(guild, client) {
    if (guild.available) {
      Table.Servers.findOrCreate({
        where: { server_id: guild.id.toString() },
        defaults: {
          server_id: guild.id.toString(),
          turnip_prices: determineTurnipPrices(),
          is_daisy_mae: isTodaySunday(),
          is_flick: false,
          is_cj: false
        }
      }).then((server, created) => {
        if (created) console.log(`Server created: ${guild.name}`);
        embed.NORMAL(titles.SERVER_JOINED, `Hello, Island ${guild.name}! Welcome to your island getaway.`, guild.systemChannel);
      }).catch(error => {
        // server could not be added to database
        console.error(error);
      });
    }
  }
};
