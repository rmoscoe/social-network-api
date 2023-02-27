const { User, Thought } = require("../models");

// Get all users
const getUsers = (req, res) => {
    User.find()
        .select('-__v')
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => res.status(500).json(err));
}

// Get a single user
const getOneUser = (req, res) => {
    User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate("thoughts")
        .populate({
            path: "friends",
            model: "user"
        })
        .then((user) => {
            !user ? res.status(404).json({ message: "No user matching that ID." }) : res.status(200).json(user)
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json(err);
        });
}

// Create a new user
const createUser = (req, res) => {
    User.create(req.body)
        .then((student) => { res.status(201).json(student) })
        .catch((err) => {
            console.error(err);
            return res.status(500).json(err);
        });
}

// Update a user
const updateUser = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((user) => { !user ? res.status(404).json({ message: "No user matching that ID" }) : res.status(200).json(user) })
        .catch((err) => {
            console.error(err);
            return res.status(500).json(err);
        });
}

// Delete a user and associated thoughts
const deleteUser = (req, res) => {
    User.findOneAndRemove({ _id: req.params.userId })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "No user matching that ID." });
            } else {
                Thought.deleteMany({ username: user.username })
                    .then((thoughtData) => { res.status(204).json(thoughtData) })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json(err);
                    });
            }
        });
}

// Add friend
const addFriend = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "No user matching that ID." });
            } else {
                User.findOneAndUpdate(
                    { _id: req.params.friendId },
                    { $addToSet: { friends: req.params.userId } },
                    { runValidators: true, new: true }
                )
                    .then((user) => {
                        if (!user) {
                            res.status(404).json({ message: "Friend not found." });
                        } else {
                            res.status(200).json({ message: "Friend successfully added." })
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json(err);
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
}

// Remove friend
const removeFriend = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "No user matching that ID." });
            } else {
                User.findOneAndUpdate(
                    { _id: req.params.friendId },
                    { $pull: { friends: req.params.userId } },
                    { runValidators: true, new: true }
                )
                    .then((user) => {
                        if (!user) {
                            res.status(404).json({ message: "Friend not found." });
                        } else {
                            res.status(200).json({ message: "Friend successfully removed." })
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json(err);
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
}

module.exports = { getUsers, getOneUser, createUser, updateUser, deleteUser, addFriend, removeFriend };