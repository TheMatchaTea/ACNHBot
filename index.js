const fs = require('fs');
const Discord = require('discord.js');
const { Sequelize, DataTypes } = require('sequelize');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

/* --- DATABASE CONFIG --- */

const sqlize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'db.sqlite'
});

const UsersTable = sqlize.define('Users', {
  user_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  island_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: {
    type: DataTypes.STRING,
    allowNull: false
  },
  villagers: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ""
  },
  trees: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "{}"
  },
  rocks: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "{}"
  },
  inventory: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "{}"
  },
  bells: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "{}"
  },
  nook_miles: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5000
  },
  daily_tasks: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: ""
  }
});

const ServersTable = sqlize.define('Servers', {
  server_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  turnip_prices: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  is_daisy_mae: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_flick: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_cj: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  }
  else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.login(process.env.TOKEN);

exports.Users = UsersTable;
exports.Servers = ServersTable;
