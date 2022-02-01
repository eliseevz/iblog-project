const express = require("express")
const Comment = require("../models/Comment")
const router = express.Router({ mergeParams: true})
const auth = require("../middleware/auth.middleware")

router
    .route("/")
    .get(auth, async (req, res) => {
        try {
            const {orderBy, equalTo} = req.query

            const list = await Comment.find({[orderBy]: equalTo})

            res.send(list)
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка"
            })
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newComment = await Comment.create({
                ...req.body,
                authorId: req.user._id
            })
            res.status(201).send(newComment)
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка"
            })
        }
    })

router.delete("/:commentId", auth, async (req, res) => {
    try {
        const {commentId} = req.params
        const removedComment = await Comment.findById(commentId)
        if (removedComment.authorId === req.user._id || req.user.isAdmin) {
            await removedComment.remove()
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