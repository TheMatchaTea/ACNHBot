function getRegularDialogue(villager) {
  switch (villager.personality) {
    case "Jock":
      return getJockDialogue(villager);
      break;
    case "Lazy":
      return getLazyDialogue(villager);
      break;
    case "Cranky":
      return getCrankyDialogue(villager);
      break;
    case "Smug":
      return getSmugDialogue(villager);
      break;
    case "Normal":
      return getNormalDialogue(villager);
      break;
    case "Peppy":
      return getPeppyDialogue(villager);
      break;
    case "Snooty":
      return getSnootyDialogue(villager);
      break;
    case "Uchi":
      return getUchiDialogue(villager);
      break;
  }
}

function getJockDialogue(villager) {
  // TODO: add more dialogue to this array!
  const dialogue = [
    `I didn't think I'd run into you here! Hey! Wanna get a few laps in with me, ${villager["catch-phrase"]}?`,
    `There's a lot of empty space in this area, so it's perfect for an outdoor training program. I've got it all planned out. We'll do push-ups, sit-ups, chin-ups and then squats.\n\nWhat? All those exercises can be done inside?! Holy protein shakes!You're right, ${villager["catch-phrase"]}!`,
    `There you are! You all set for our giant-muscle showdown? Huh? Did I catch you off guard? Let that be a lesson—never let your guard down, ${villager["catch-phrase"]}!`,
    `Timmy's selling some really great stuff at Nook's Cranny. I'm actually kind of a celebrity there. I get surrounded with help the moment I enter, ${villager["catch-phrase"]}. Ah, the perks of being a major league star.`
  ]

  let index = Math.floor(Math.random() * dialogue.length);
  return dialogue[index];
}

function getLazyDialogue(villager) {
  const catchphrase = villager["catch-phrase"];

  // TODO: add dialogue to this array!
  //      use back ticks to surround the string
  //      use the catchphrase variable where a catchphrase should be placed
  //      try to follow the format of the elements in the jock function

  const dialogue = [];

  let index = Math.floor(Math.random() * dialogue.length);
  return dialogue[index];
}

function getCrankyDialogue(villager) {
  const catchphrase = villager["catch-phrase"];

  // TODO: add dialogue to this array!
  //      use back ticks to surround the string
  //      use the catchphrase variable where a catchphrase should be placed
  //      try to follow the format of the elements in the jock function

  const dialogue = [];

  let index = Math.floor(Math.random() * dialogue.length);
  return dialogue[index];
}

function getSmugDialogue(villager) {
  const catchphrase = villager["catch-phrase"];

  // TODO: add dialogue to this array!
  //      use back ticks to surround the string
  //      use the catchphrase variable where a catchphrase should be placed
  //      try to follow the format of the elements in the jock function

  const dialogue = [];

  let index = Math.floor(Math.random() * dialogue.length);
  return dialogue[index];
}

function getNormalDialogue(villager) {
  const catchphrase = villager["catch-phrase"];

  // TODO: add dialogue to this array!
  //      use back ticks to surround the string
  //      use the catchphrase variable where a catchphrase should be placed
  //      try to follow the format of the elements in the jock function

  const dialogue = [];

  let index = Math.floor(Math.random() * dialogue.length);
  return dialogue[index];
}

function getPeppyDialogue(villager) {
  const catchphrase = villager["catch-phrase"];

  // TODO: add dialogue to this array!
  //      use back ticks to surround the string
  //      use the catchphrase variable where a catchphrase should be placed
  //      try to follow the format of the elements in the jock function

  const dialogue = [];

  let index = Math.floor(Math.random() * dialogue.length);
  return dialogue[index];
}

function getSnootyDialogue(villager) {
  const catchphrase = villager["catch-phrase"];

  // TODO: add dialogue to this array!
  //      use back ticks to surround the string
  //      use the catchphrase variable where a catchphrase should be placed
  //      try to follow the format of the elements in the jock function

  const dialogue = [];

  let index = Math.floor(Math.random() * dialogue.length);
  return dialogue[index];
}

function getUchiDialogue(villager) {
  const catchphrase = villager["catch-phrase"];

  // TODO: add dialogue to this array!
  //      use back ticks to surround the string
  //      use the catchphrase variable where a catchphrase should be placed
  //      try to follow the format of the elements in the jock function

  const dialogue = [];

  let index = Math.floor(Math.random() * dialogue.length);
  return dialogue[index];
}
