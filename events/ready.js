const Table = require("../index.js");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    client.user.setPresence({
      activity: {
        name: "ac%help"
      },
      status: "online"
    })
    .then(console.log(`Ready! Logged in as ${client.user.tag}`)).catch(console.error);
    Table.Users.sync();
    Table.Servers.sync();
  }
}
