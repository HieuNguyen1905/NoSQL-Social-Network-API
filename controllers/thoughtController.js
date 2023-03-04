const express = require("express");
const { User, Thought } = require('../models');
const router = express.Router();

router.post("/", async (req, res) => {

    const findUser = await User.findOne({ username: req.body.username });
    if (findUser) {
        const newThought = await Thought.create(req.body);
        const getUser = await User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: newThought } }, { new: true })
        res.json(newThought)
    } else {
        res.json({ msg: "no user found" })
    }
})

router.get("/", async (req, res) => {
    const data = await Thought.find();
    res.json(data)
})

router.get("/:id", async (req, res) => {
    const data = await Thought.findOne({ _id: req.params.id });
    res.json(data)
})

router.put("/:id", async (req, res) => {
    const data = await Thought.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
    res.json(data)
})

router.delete("/:id", async (req, res) => {
    const data = await Thought.findOneAndDelete({ _id: req.params.id });
    res.json(data)
})

router.post("/:thoughtId/reactions", async (req, res) => {
    const data = await Thought.findOne({ _id: req.params.thoughtId })
    if (!data) {
        res.json({ msg: "no such thought" })
    }
    const newReact = { reactionBody: req.body.reactionBody, username: req.body.username }
    const react = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: newReact } }, { new: true })
    res.json(react)
})

router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
    const data = await Thought.findOne({ _id: req.params.thoughtId })
    if (!data) {
        res.json({ msg: "no such thought" })
    }
    const react = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: {_id:req.params.reactionId} } }, { new: true })
    const newReact = await Thought.findOne({ _id: req.params.thoughtId })
    res.json(newReact)
})

module.exports = router;