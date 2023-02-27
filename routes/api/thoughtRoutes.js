const router = require("express").Router();
const { getThoughts, getOneThought, createThought, updateThought, deleteThought, createReaction, deleteReaction } = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);
router.route("/:thoughtId").get(getOneThought).put(updateThought).delete(deleteThought);
router.route("/:thoughtId/reactions").post(createReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;