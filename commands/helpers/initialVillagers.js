const Discord = require("discord.js");
const fs = require("fs");
const parse = require("csv-parse");
const fetch = require('node-fetch');
require("dotenv").config()

const Table = require("../../index.js");
const embed = require("../../embeds.js");

const { prefix, color, villagerCount } = require("../../config.json");
const { titles, error, warning } = require("../../lines.json");
const { emojis } = require("../../emojis.json");

const villagerEndpoint = "villagers/";

// init jock and uchi arrays
let jockVillagers = []; let uchiVillagers = [];

// retrieves villagers from api
function retrieveVillagers(nickname, msg) {
  let url = `${process.env.API_ENDPOINT}${villagerEndpoint}`;
  console.log(url);
  return fetch(url).then(res => {
    console.log("retrieved villager data");
    res.json().then(villagers => {
      // if villagers have been retrieved
      if (villagers) {
        console.log("i got some villagers!");
        // read csv file to retrieve ids
        fs.readFile("./villagerData.csv", (err, data) => {
          if (err) console.error(err);
          parse(data, { columns: false, trim: true }, (err, rows) => {
            if (err) console.error(err);
            for (const row of rows) {
              // retrieve each villager's id
              console.log(row);
              if (row[0] !== "file_name") {
                let id = row[0];
                let villager = villagers[id];
                console.log("line 39, villager: ", villager);
                if (villager) {
                  if (villager.personality === "Jock") jockVillagers.push(villager);
                  else if (villager.personality === "Uchi") uchiVillagers.push(villager);
                }
              }
            }

            // exit loop

            console.log("jock villagers amt: ", jockVillagers.length);
            console.log("uchi villagers amt: ", uchiVillagers.length);

            // pick random jock and uchi villagers
            const jockIndex = Math.floor(Math.random() * jockVillagers.length);
            const uchiIndex = Math.floor(Math.random() * uchiVillagers.length);

            // retrieve random villagers
            const jockVillager = jockVillagers[jockIndex];
            const uchiVillager = uchiVillagers[uchiIndex];

            console.log(jockVillager);
            console.log(uchiVillager);

            // assign them base friendship values
            jockVillager.friendship = 0; uchiVillager.friendship = 0;

            // stringify json to add to table
            const initVillagers = [jockVillager, uchiVillager];
            const stringInitVillagers = JSON.stringify(initVillagers);

            // update table
            Table.Users.update({ villagers: stringInitVillagers }, { where: { user_id: msg.author.id }}).then(updatedUser => {
              if (updatedUser > 0) {
                // if user could be found to update
                console.log("messaging user");
                initVillagers.forEach(villager => {
                  let villagerEmoji = emojis.find(emoji => emoji.name === villager["name"]["name-USen"].toLowerCase());
                  embed.IMAGE(villager["bubble-color"], titles.VILLAGER_ENTER, `${msg.author.toString()}, **${villager["name"]["name-USen"]}** has joined you! ${villagerEmoji.rawEmoji}`, villager.image_uri, msg.channel);
                })
              }
              else {
                embed.error("Could not find user to assign villagers to.", msg.channel);
              }
            }).catch(error => console.error(error));
          });
        });
      }
      else {
        console.log("i didn't actually get villagers i am a liar");
      }
    }).catch(err => console.error(err));
  }).catch(error => console.error(error));

}

exports.generateVillagers = retrieveVillagers;
