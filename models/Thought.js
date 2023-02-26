const mongoose = require("mongoose");
const formatDateAndTime = require("../utils/helpers");
const { userSchema } = require("./User");

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
            default: Date.now,
            get: formatDateAndTime
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
                default: Date.now,
                get: formatDateAndTime
            }
        })]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    }
);

// Virtual reactionCount property
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

// Initialize Thought model
const Thought = mongoose.model("thought", thoughtSchema);

module.exports = { Thought, thoughtSchema };