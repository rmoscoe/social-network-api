const { User, Thought } = require("../models");

// Get all thoughts
const getThoughts = (req, res) => {
    Thought.find()
        .select('-__v')
        .populate({
            path: "reactions",
            options: { getters: true }
        })
        .then((thoughts) => {
            res.status(200).json(thoughts);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
}

// Get a single thought
const getOneThought = (req, res) => {
    Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .populate("reactions")
        .then((thought) => {
            !thought ? res.status(404).json({ message: "No thought matching that ID." }) : res.status(200).json(thought)
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json(err);
        });
}

// Create a new thought and push its id to the user's thoughts array
const createThought = (req, res) => {
    Thought.create(req.body)
        .then((thought) => {
            User.findOneAndUpdate(
                { username: thought.username },
                { $addToSet: { posts: thought._id } },
                { runValidators: true, new: true }
            )
                .then((user) => {
                    if (!user) {
                        res.status(404).json({ message: "No user matching that ID." });
                    } else {
                        res.status(201).json(thought);
                    }
                })
                .catch((err) => {
                    console.error("Error adding thought to User's thoughts: ", err);
                    res.status(500).json(err);
                });
        })
        .catch((err) => {
            console.error("Error creating thought: ", err);
            return res.status(500).json(err);
        });
}


// Update a thought
const updateThought = (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((thought) => { !thought ? res.status(404).json({ message: "No thought matching that ID." }) : res.status(200).json(thought) })
        .catch((err) => {
            console.error(err);
            return res.status(500).json(err);
        });
}

// Delete a thought
const deleteThought = (req, res) => {
    Thought.findByIdAndDelete(req.params.thoughtId)
        .then((thought) => { !thought ? res.status(404).json({ message: "No thought matching that ID." }) : res.status(200).json(thought) })
        .catch((err) => {
            console.error(err);
            return res.status(500).json(err);
        });
}

// Create a reaction
const createReaction = (req, res) => {
    Thought.findById(req.params.thoughtId)
        .then(async (thought) => {
            if (!thought) {
                res.status(404).json({ message: "No thought matching that ID." });
            } else {
                thought.reactions.push(req.body);
                await thought.save((err) => {
                    if (err) {
                        console.error("Error saving thought: ", err);
                        return res.status(500).json(err);
                    } else {
                        res.status(201).json(thought);
                    }
                });
            }
        })
        .catch((err) => {
            console.error("Error finding thought: ", err);
            res.status(500).json(err);
        });
}

// Delete a reaction and remove it
const deleteReaction = (req, res) => {
    Thought.findById(req.params.thoughtId)
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: "No thought matching that ID." });
            } else {
                thought.reactions.pull({ _id: req.params.reactionId });
                thought.save((err) => {
                    if (err) {
                        console.error("Error saving thought: ", err);
                        return res.status(500).json(err);
                    } else {
                        res.status(204).json(thought);
                    }
                });
            }
        })
        .catch((err) => {
            console.error("Error finding thought: ", err);
            return res.status(500).json(err);
        });
}

module.exports = { getThoughts, getOneThought, createThought, updateThought, deleteThought, createReaction, deleteReaction };