const mongoose = require("mongoose");

// Schema to create Thought model
const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,
            ref: "User"
        },
        reactions: [new mongoose.Schema({
            reactionId: {
                type: mongoose.Schema.Types.ObjectId,
                default: new mongoose.Types.ObjectId
            },
            reactionBody: {
                type: String,
                required: true,
                maxLength: 280
            },
            username: {
                type: String,
                required: true,
                ref: "User"
            },
            createdAt: {
                type: Date,
                default: formatDateTime(Date.now)
            }
        })]
    },
    {
        toJSON: {
            virtuals: true
        },
    }
);

// Getter method for Thought createdAt
thoughtSchema.methods.getCreateDate = function () {
    const date = this.createdAt;
    console.log(date);

    //TODO: Finish this method after seeing how the date gets output
}

// Getter method for reaction createdAt
thoughtSchema.post("init", function () {
    const reactions = this.get("reactions");
    reactions.forEach(reaction => {
        reaction.getCreateDate = function () {
            const date = this.createdAt;
            console.log(date);

            // TODO: Finish this method after seeing how the date gets output
        }
    })
})

// Virtual reactionCount property
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

// Initialize Thought model
const Thought = mongoose.model("thought", thoughtSchema);

module.exports = { Thought, thoughtSchema };