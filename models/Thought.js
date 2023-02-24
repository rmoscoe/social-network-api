const { Schema, Model } = require("mongoose");

// Schema to create Thought model
const thoughtSchema = new Schema(
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
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        reactions: [new mongoose.Schema({
            reactionId: {
                type: ObjectId,
                default: new mongoose.Types.ObjectId
            },
            reactionBody: {
                type: String,
                required: true,
                maxLength: 280
            },
            username: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "User"
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        })]
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
const Thought = model("thought", thoughtSchema);

module.exports = Thought;