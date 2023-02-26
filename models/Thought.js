const mongoose = require("mongoose");
const formatDateAndTime = require("../utils/helpers");

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
            virtuals: true
        },
    }
);

// Getter method for Thought createdAt
// thoughtSchema.post("init", function () {
//     const date = new Date(this.createdAt);
//     this.createdAt = date.toLocaleString("en-us", {
//         localeMatcher: "best fit",
//         weekday: undefined,
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit"
//     });
// });

// thoughtSchema.methods.getCreateDate = function () {
//     const date = this.createdAt;
//     return date.toLocaleString("en-us", {
//         localeMatcher: "best fit",
//         weekday: undefined,
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit"
//     });
// }

// Getter method for reaction createdAt
// thoughtSchema.post("init", async function () {
//     console.log("Running middleware");
//     const tDate = new Date(this.createdAt);
//     console.log("Date: ", tDate);
//     console.log(tDate.toLocaleString("en-us", {
//         localeMatcher: "best fit",
//         weekday: undefined,
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit"
//     }));
//     this.createdAt = tDate.toLocaleString("en-us", {
//         localeMatcher: "best fit",
//         weekday: undefined,
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit"
//     });
//     const reactions = this.get("reactions");
//     reactions.forEach(reaction => {
//         const date = new Date(reaction.createdAt);
//         console.log(date.toLocaleString("en-us", {
//             localeMatcher: "best fit",
//             weekday: undefined,
//             month: "short",
//             day: "2-digit",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//             second: "2-digit"
//         }));
//         reaction.createdAt = date.toLocaleString("en-us", {
//             localeMatcher: "best fit",
//             weekday: undefined,
//             month: "short",
//             day: "2-digit",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//             second: "2-digit"
//         });
//     });
// });

// Virtual reactionCount property
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

// Initialize Thought model
const Thought = mongoose.model("thought", thoughtSchema);

module.exports = { Thought, thoughtSchema };