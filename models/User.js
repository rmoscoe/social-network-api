const { Schema, model } = require("mongoose");
const { thoughtSchema } = require("./Thought");

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^([a-z0-9]{1})([a-z0-9_\.!#$%&'*+-/=?^`{|}~]{0,63})@([\da-z\.-]{1,253})\.([a-z\.]{2,6})$/
        },
        thoughts: [thoughtSchema],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// Virtual friendCount property
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

// Initialize User model
const User = model("user", userSchema);

module.exports = { User, userSchema };