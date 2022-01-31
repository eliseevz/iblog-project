const express = require("express")
const Article = require("../models/Article")
const router = express.Router({ mergeParams: true})
const auth = require("../middleware/auth.middleware")

router
    .route("/")
    .get(async (req, res) => {
        try {
            const list = await Article.find()
            res.status(200).send(list)
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка"
            })
        }
    })
    .post(auth, async (req, res) => {
        console.log(req.user, ' user id')
        try {
            const newArticle = await Article.create({
                ...req.body,
                authorId: req.user._id
            })
            console.log(newArticle, " new article")
            res.status(201).send(newArticle)
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка",
                e: e.message
            })
        }
    })

router.patch("/:articleId", auth, async (req, res) => {
    try {
        const {articleId} = req.params
        const article = await Article.findById(articleId)

        if (article?.authorId === req?.user?._id) {
            const updatedArticle = await Article.findByIdAndUpdate(articleId, req.body, {new: true})
            res.send(updatedArticle)
        } else {
            res.status(401).json({
                message: "Unathorized"
            })
        }

    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        })
    }
})

router.delete("/:articleId", auth, async (req, res) => {
    try {
        const {articleId} = req.params
        const removedArticle = await Article.findById(articleId)

        console.log(removedArticle.authorId)
        console.log(req?.user?._id)

        if (removedArticle.authorId === req?.user?._id) {
            await removedArticle.remove()
            return res.send(null)
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