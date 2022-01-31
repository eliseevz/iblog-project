const {Schema, model} = require("mongoose")

const schema = new Schema({
    nickname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    articles: [{
        type: String
    }],
    favorites: [String]
}, {
    timestamps: true
})

module.exports = model("User", schema)