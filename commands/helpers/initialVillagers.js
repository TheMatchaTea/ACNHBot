const Discord = require("discord.js");
const fetch = require('node-fetch');
require("dotenv").config()

const { Users, Servers } = require("../../index.js");
const embed = require("../../embeds.js");

const { prefix, color, villagerCount } = require("../../config.json");
const { titles, error, warning } = require("../../lines.json");

const villagerEndpoint = "villagers/";

// retrieves villagers from api
function retrieveVillagers() {
  let villagerList;
  fetch(`${process.env.API_ENDPOINT}${villagerEndpoint}`).then(res => {
    let villagerList = res.json();
    console.log("retrieved villager data");
  }).catch(error => console.error(error));

  return villagerList;
}

// randomly generates the first uchi and jock villagers

// TODO: fix bugs in this file

function generateInitialVillagers(nickname, id, msg) {
  let villagers = retrieveVillagers();
  let jockVillagers = villagers.filter(villager => villager.personality === "Jock");
  let uchiVillagers = villagers.filter(villager => villger.personality === "Uchi");

  const jockIndex = Math.floor(Math.random() * jockVillagers.length);
  const uchiIndex = Math.floor(Math.random() * uchiVillagers.length);

  const jockVillager = jockVillagers[jockVillager];
  const uchiVillager = uchiVillagers[uchiVillager];

  jockVillager.friendship = 0; uchiVillager.friendship = 0;

  const initVillagers = JSON.stringify([jockVillager, uchiVillager]);

  Users.update({ villagers: initVillagers }, { where: { user_id: msg.author.id }}).then(updatedUser => {
    if (updatedUser > 0) {
      // if user could be found to update
      initVillagers.forEach(villager => {
        embed.IMAGE(villager["bubble-color"], titles.VILLAGER_ENTER, `${msg.author.toString()}, ${villager["name"]["name-USen"]} has joined you!`, villager.image_uri, msg.channel);
      })
    }
    else {
      embed.error("Could not find user to assign villagers to.", msg.channel);
    }
  }).catch(error => console.error(error));
}

exports.generateVillagers = generateInitialVillagers;
