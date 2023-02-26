const { User, Thought } = require("../models");

const getUsers = (req, res) => {
    User.find()
        .then((users) => {
            console.log("Thought created at: ", users[0].thoughts[0].createdAt);
            res.status(200).json(users);
        })
        .catch((err) => res.status(500).json(err));
}

module.exports = { getUsers };