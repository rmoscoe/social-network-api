const connection = require("../config/connection");
const { User } = require("../models/User");
const { Thought } = require("../models/Thought");
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

    const thoughts = [];

    for (let i = 0; i < 20; i++) {
        const thought = makeThought(users);
        thoughts.push(thought);
    }

    await User.collection.insertMany(users);

    await Thought.collection.insertMany(thoughts);

    let seededUsers = await User.find();

    for (let i = 0; i < 18; i++) {
        const friend1 = seededUsers[Math.floor(Math.random() * seededUsers.length)];
        let friend2 = seededUsers[Math.floor(Math.random() * seededUsers.length)];

        while (friend1 === friend2) {
            friend2 = seededUsers[Math.floor(Math.random() * seededUsers.length)];
        }
        
        await User.findOneAndUpdate({ "_id": friend1._id }, { $push: { friends: friend2._id } }, { new: true });

        await User.findOneAndUpdate({ "_id": friend2._id }, { $push: { friends: friend1._id } }, { new: true });
    }

    const seededThoughts = await Thought.find();

    seededThoughts.forEach(async (thought) => {
        // Get the username and add the thought id to the user's thoughts.
        for (let i = 0; i < seededUsers.length; i++) {
            if (seededUsers[i].username === thought.username) {
                await User.findOneAndUpdate({"_id": seededUsers[i]._id}, {$push: {thoughts: thought._id}}, {new: true});
                break;
            }
        }
    });

    seededUsers = await User.find();
    
    // const objUsers = seededUsers.map((user) => {return user.toObject({virtuals: true})});
    // const objThoughts = seededThoughts.map((thought) => {return thought.toObject({virtuals: true})});

    // console.log(objUsers);
    // console.log(objThoughts);

    console.log(seededUsers.toString());
    console.log(seededThoughts.toString());
    process.exit(0);
});