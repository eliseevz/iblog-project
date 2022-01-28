const {Schema, model} = require("mongoose")

const schema = new Schema({
    author: {
        type: String,
    },
    content: [{
        type: String
    }],
    short: {
        type: String
    },
    tags: [{
        type: String
    }],
    title: {
        type: String
    }
}, {
    timestamps: {createdAt: "date"}
})

module.exports = model("Article", schema)