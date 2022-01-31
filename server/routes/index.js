const express = require("express")
const router = express.Router({mergeParams: true})

router.use("/auth", require("./auth.routes"))
router.use("/users", require("./user.routes"))
router.use("/tags", require("./tags.routes"))
router.use("/articles", require("./articles.routes"))
router.use("/comments", require("./comments.routes"))

module.exports = router