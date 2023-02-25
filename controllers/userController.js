const { User, Thought } = require("../models");

const getUsers = (req, res) => {
    User.find()
}