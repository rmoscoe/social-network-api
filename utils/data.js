const usernames = [
    "Aragorn",
    "gandalf",
    "Sauron",
    "sauruman",
    "Theoden",
    "gollum",
    "Frodo",
    "bilbo",
    "Merry",
    "pippin",
    "Samwise",
    "boromir",
    "faramir",
    "Arwen",
    "legolas",
    "Gimli",
    "galadriel",
    "Denethor",
    "eomir",
    "Eowen",
    "elrond"
];

const thoughtTexts = [
    "By all that you hold dear on this good Earth, I bid you stand!",
    "You shall not pass!",
    "The world will burn.",
    "I gave you the chance of aiding me willing me, but you have elected the way of pain!",
    "No parent should have to bury their child.",
    "We likes it raw and wriggling. You keep nasty chips!",
    "A wizard is never late! Nor is he early. He arrives precisely when he means to.",
    "Your words would seem wise but for the warning in my heart.",
    "No more well-wishers or distant relations!",
    "Everyone knows I'm the tall one.",
    "If I were a knight of Rohan, capable of great deeds... But I'm not.",
    "I made a promise! Don't you leave him. And I don't mean to.",
    "One does not simply walk into Mordor.",
    "To enter the forbidden pool carries the penalty of death. Shall I shoot?",
    "If you want him, come and claim him!",
    "They're taking the hobbits to Isengard!",
    "Forty-two? Not bad for a pointy-eared, elvish princeling. I myself am sitting pretty on 43.",
    "I know what it is you saw, for I have seen it too.",
    "They say you vanquished the enemy almost single-handed!",
    "Do not trust to hope. It has forsaken these lands.",
    "I am no man.",
    "No, indeed it is hardly possible to separate you, even when he is summoned to a secret council and you are not.",
    "Fly, you fools!",
    "If you are a friend, you speak the password, and the door will open.",
    "I can go unseen if I wish, but to be truly invisible? That is a rare gift.",
    "I will be dead before I see the ring in the hands of an elf!",
    "What do trees have to talk about, apart from the consistency of squirrel droppings?"
];

const reactionBodies = [
    "I agree.",
    "I disagree.",
    "Yes, that!",
    "Worst. Thought. Ever.",
    "Go back to Middle Earth, loser!",
    "Well said!",
    "Thumbs up.",
    "It is folly. Not with 10,000 men could you do this.",
    "OMG, me too!",
    "Like!",
    "LOL",
    "ROFLOL!",
    "Click here to meet single women in your area for free!",
    "I cannot jump the distance; you'll have to toss me. Uh, don't tell the elf!",
    "Totally!",
    "Preach!",
    "Love!",
    "Fake news!",
    "SMH.",
    "TL;DR",
    "That is the smartest thing I have ever heard anyone say about anything.",
    "Fool of a Took!",
    "You stink of horse!",
    "What is Rohan but a thatched barque where brigands drink in the reek?",
    "My precious.",
    "Is it secret? Is it safe?"
];

function getRandomUniqueItem (arr) {
    return arr.splice(arr[Math.floor(Math.random() * arr.length)], 1)[0];
}

function getRando (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function makeUser () {
    const username = getRandomUniqueItem(usernames);
    const email = `${username}@lotr.com`;
    return { username, email, thoughts: [], friends: []}
}

function makeThought (users) {
    const thoughtText = getRandomUniqueItem(thoughtTexts);
    const reactions = [];
    for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
        const reaction = {};
        reaction.reacionBody = getRando(reactionBodies);
        reaction.username = users[Math.floor(Math.random() * users.length)].username;
        reactions.push(reaction);
    }
    const thought = {
        thoughtText,
        username: users[Math.floor(Math.random() * users.length)].username,
        reactions
    }
    return thought;
}

module.exports = { makeUser, makeThought };