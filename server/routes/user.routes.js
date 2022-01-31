const express = require("express")
const User = require("../models/User")
const router = express.Router({ mergeParams: true})
const auth = require("../middleware/auth.middleware")

router.get("/", async (req, res) => {
    try {
        const list = await User.find()
        res.status(200).send(list)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка"
        })
    }
})

router.patch("/:userId", auth, async (req, res) => {
    try {
        const data = req.body
        const {userId} = req.params

        if (req.user._id === userId) {
            const userUpdated = await User.findByIdAndUpdate(userId, data, {new: true})
            res.status(201).send(userUpdated)
        } else {
            res.status(401).json({
                message: "Unathorized"
            })
        }

    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка"
        })
    }
})

module.exports = router