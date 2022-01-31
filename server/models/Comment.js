const {Schema, model} = require("mongoose")

const schema = new Schema({
    author: String,
    authorId: String,
    content: String,
    pageId: String
}, {
    timestamps: {createdAt: "date"}
})

module.exports = model("Comment", schema)