function getRegularDialogue(villager) {
  switch (villager.personality) {
    case "Jock":
      return getJockDialogue();
      break;
    case "Lazy":
  }
}

function getJockDialogue(villager) {
  const dialogue = [
    `I didn't think I'd run into you here! Hey! Wanna get a few laps in with me, ${villager["catch-phrase"]}?`,
    `There's a lot of empty space in this area, so it's perfect for an outdoor training program. I've got it all planned out. We'll do push-ups, sit-ups, chin-ups and then squats.\n\nWhat? All those exercises can be done inside?! Holy protein shakes!You're right, ${villager["catch-phrase"]}!`,
    `There you are! You all set for our giant-muscle showdown? Huh? Did I catch you off guard? Let that be a lesson—never let your guard down, ${villager["catch-phrase"]}!`,
    `Timmy's selling some really great stuff at Nook's Cranny. I'm actually kind of a celebrity there. I get surrounded with help the moment I enter, ${villager["catch-phrase"]}. Ah, the perks of being a major league star.`
  ]

  let index = Math.floor(Math.random() * dialogue.length);
  return dialogue[index];
}
