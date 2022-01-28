const express = require("express")
const Article = require("../models/Article")
const router = express.Router({ mergeParams: true})

router.get("/", async (req, res) => {
    try {
        const list = await Article.find()
        res.status(200).send(list)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка"
        })
    }
})

module.exports = router