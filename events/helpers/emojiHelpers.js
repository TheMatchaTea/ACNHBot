const Discord = require("discord.js");
const fs = require("fs");

const { emojiServers } = require("../../config.json");

function createEmojiObject(client) {
  let objects = {emojis: []};
  emojiServers.forEach((serverId, i) => {
    let server = client.guilds.cache.get(serverId);
    server.emojis.cache.each(emoji => {
      const emojiString = emoji.toString();
      const emojiObject = {
        name: emoji.name,
        rawEmoji: emoji.toString()
      };
      objects.emojis.push(emojiObject);
    });
  });
  const stringifyObject = JSON.stringify(objects, null, 2);
  return stringifyObject;
}

function writeEmojisToFile(client) {
  let obj = createEmojiObject(client);
  fs.writeFileSync("./emojis.json", "", err => {
    if (err) console.error(err);
    else console.log("cleared file");
  });

  fs.writeFileSync("./emojis.json", obj, err => {
    if (err) console.error(err);
    else console.log("emojis added successfully")
  })
}

exports.writeEmojis = writeEmojisToFile;
