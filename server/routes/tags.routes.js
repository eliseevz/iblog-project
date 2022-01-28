const express = require("express")
const Tag = require("../models/Tag")
const router = express.Router({ mergeParams: true})

router.get("/", async (req, res) => {
    try {
        const list = await Tag.find()
        res.status(200).send(list)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла "
        })
    }
})

module.exports = router