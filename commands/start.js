const Discord = require('discord.js');

const { prefix, color, usage } = require("../config.json");
const { titles, error, warning } = require("../lines.json");
const { emojis } = require("../emojis.json");

const embed = require("../embeds.js");
const Table = require("../index.js");
const playerInit = require("./helpers/islandLayout.js");
const { generateVillagers } = require("./helpers/initialVillagers.js");

let nookling = emojis.find(emoji => emoji.name === "nookling");

module.exports = {
  name: 'start',
  description: 'Create your ACNH Simulator Passport.',
  cooldown: 5,
  aliases: ['create'],
  usage: `${prefix}${usage.start}`,
  execute(msg, args, client) {
    // initialize collector
    let nickname, islandName, birthday, response;

    let forceEnd = false; // becomes true if the collector was forced to quit

    function birthdayValidator(bday) {
      let splitBday = bday.split('/');
      console.log(splitBday);
      if (splitBday.length !== 2) return false;
      if (splitBday[0].length !== 2 || splitBday[1].length !== 2) return false;
      console.log(splitBday[0].charAt(0));
      let first = splitBday[0].charAt(0);
      let second = splitBday[0].charAt(1);
      let third = splitBday[1].charAt(0);
      let fourth = splitBday[1].charAt(1);
      // impossible dates and months
      if (first > 1 || third > 3) return false;
      if (first == 1 && second > 2) return false;
      // impossible date boundaries
      if (first == 0 && second == 2 && third > 2) return false; // less than 30 days in february
      return true;
    }

    const filter = m => m.author.id === msg.author.id;
    const collector = msg.channel.createMessageCollector(filter, { time: 1000000000 });

    Table.Users.findOne({ where: { user_id: msg.author.id } }).then(user => {
      // check if the user already exists
      if (user) {
        console.log("user does exist")
        return embed.NORMAL(titles.WELCOME, `${nookling.rawEmoji} You already have a passport with us, ${msg.author.toString()}!`, msg.channel);
      }
      else {
        // otherwise create user passport
        console.log("user does not exist");
        embed.NORMAL(titles.WELCOME, `${nookling.rawEmoji} Welcome! Let me ask, what is your name?\n\nReply with \`exit\` to stop at any time.`, msg.channel);

        collector.on('collect', m => {
          console.log(`collected ${m.content}`);
          if (m.content === "exit") {
            // forces the collector to end
            forceEnd = true;
            collector.stop();
          }
          else {
            if (!nickname) {
              nickname = m.content;
              embed.NORMAL(titles.WELCOME, `${nookling.rawEmoji} Hi, ${nickname}! It's nice to meet you. Where are you heading off to?\n\nReply with \`exit\` to stop at any time.`, msg.channel);
            }
            else if (nickname && !islandName) {
              islandName = m.content;
              embed.NORMAL(titles.WELCOME, `${nookling.rawEmoji} **${islandName}**... I've been there before. The scenery is so nice!\n\nNow, for documentation purposes, may I ask when is your birthday? (Please provide the birthdate in \`MM/DD\` format.)\n\nReply with \`exit\` to stop at any time.`, msg.channel);
            }
            else if (nickname && islandName && !birthday){
              if (!birthdayValidator(m.content)) {
                embed.NORMAL(titles.WELCOME, `${nookling.rawEmoji} That is not a valid birthday! Please give a birth date in the format \`MM/DD\`.\n\nReply with \`exit\` to stop at any time.`, msg.channel);
              }
              else {
                birthday = m.content;
                let passportEmbed = new Discord.MessageEmbed()
                                               .setColor(color.embed)
                                               .setTitle(titles.WELCOME)
                                               .setDescription(`${nookling.rawEmoji} Thank you for your time, ${nickname}! I've got your passport right here. Does this information look correct? Say \`yes\` if so, please reply with \`no\` to fix any mistakes.`, msg.channel)
                                               .addFields(
                                                 { name: "Nickname", value: nickname },
                                                 { name: "Island Name", value: islandName },
                                                 { name: "Birthday", value: birthday }
                                               )
                                               .setFooter("Reply with `exit` to stop at any time.");
                msg.channel.send(passportEmbed);
              }
            }
            else {
              let response = m.content.toString().toLowerCase();
              console.log(response);
              if (response == "yes") {
                embed.NORMAL(titles.WELCOME, `${nookling.rawEmoji} Thank you so much! Now departing to: **${islandName} Island**. We hope you enjoy your trip! :island:`, msg.channel)
                collector.stop();
              }
              else if (response == "no") {
                nickname = undefined; islandName = undefined; birthday = undefined; response = undefined;
                embed.NORMAL(titles.WELCOME, `${nookling.rawEmoji} Roger that! Then, let me ask again, what is your name?\n\nReply with \`exit\` to stop at any time.`, msg.channel);
              }
              else {
                response = undefined;
                embed.NORMAL(titles.WELCOME, `${nookling.rawEmoji} That is not a valid response. Please respond with \`yes\` or \`no\`.\n\nReply with \`exit\` to stop at any time.`, msg.channel);
              }
            }
          }
        });

        collector.on('end', collected => {
          console.log(`collected ${collected.size} items`);
          if (forceEnd) return embed.NORMAL(titles.WELCOME, "Passport creation menu has been closed!", msg.channel);

          Table.Users.create({
            user_id: msg.author.id.toString(),
            nickname: nickname,
            island_name: islandName,
            birthday: birthday,
            trees: playerInit.trees(),
            rocks: playerInit.rocks(),
            inventory: playerInit.inventory(),
            bells: playerInit.bells()
          }).then(user => {
            console.log(`added user ${user.user_id}`);
            generateVillagers(nickname, msg);
          }).catch(error => console.error(error));
        });
      }
    }).catch(error => console.error(error));


  }
}
