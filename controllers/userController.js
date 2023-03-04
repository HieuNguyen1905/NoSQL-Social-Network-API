const express = require("express");
const { User } = require('../models');
const router = express.Router();

router.post("/", async (req, res) => {
    const newUser = await User.create(req.body);
    res.json(newUser)
})

router.get("/", async (req, res) => {
    const getUser = await User.find();
    res.json(getUser)
})

router.get("/:id", async (req, res) => {
    const getUser = await User.findOne({ _id: req.params.id });
    res.json(getUser)
})

router.put("/:id", async (req, res) => {
    const update = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    res.json(update)
})

router.delete("/:id", async (req, res) => {
    const update = await User.findOneAndDelete({ _id: req.params.id })
    res.json(update)
})

router.post("/:userId/friends/:friendId", async (req, res) => {
    const findUser = await User.findOne({ _id: req.params.userId })
    for (let i = 0; i <= findUser.friends.length; i++) {
        if (findUser.friends[i] == req.params.friendId) {
            res.send("Already friend with this person!")
        }
    }
    const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $push: { friends: req.params.friendId} }, { new: true })
    res.json(user)
})

router.delete("/:userId/friends/:friendId", async (req, res) => {
    const findUser = await User.findOne({ _id: req.params.userId })
    for (let i = 0; i <= findUser.friends.length; i++) {
        if (findUser.friends[i] == req.params.friendId) {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
        }
    }
    const newUser = await User.findOne({ _id: req.params.userId })
    res.json(newUser)
})

module.exports = router;