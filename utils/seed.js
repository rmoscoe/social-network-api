const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { makeUser, makeThought } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [];

    for (let i = 0; i < 9; i++) {
        const user = makeUser();
        users.push(user);
    }

    users.forEach((user, idx, users) => {
        for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
            do {
                let friend = users[Math.floor(Math.random() * users.length)].username;
            }
            while (friend === user.username || user.friends.includes(friend));
            user.friends.push(friend);
        }
    })

    const thoughts = [];

    for (let i = 0; i < 20; i++) {
        const thought = makeThought();
        thoughts.push(thought);
    }

    thoughts.forEach((thought) => {
        thought.reactions.forEach((reaction) => {
            reaction.username = users[Math.floor(Math.random() * users.length)]._id;
        });
        thought.username = users[Math.floor(Math.random() * users.length)].username;
    });

    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < thoughts.length; j++) {
            if (thoughts[j].username === users[i].username) {
                users[i].thoughts.push(thoughts[j]._id);
            }
        }
    }

    thoughts.forEach((thought) => {
        const person = thought.username;
        thought.username = person._id;
    });

    await User.collection.insertMany(users);

    await Post.collection.insertMany(posts);

    const finalUsers = await User.find().populate("friends").populate("thoughts");

    const finalThoughts = await Thought.find().populate("username").populate({
        path: "reactions",
        populate: [
            {path: "username", model: "User"}
        ]
    });
    
    console.table(finalUsers);
    console.table(finalThoughts);
    process.exit(0);
});