const User = require("../models/User")
const Tag = require("../models/Tag")
const Article = require("../models/Article")
const UsersMock = require("../mockData/users.json")
const TagsMock = require("../mockData/tags.json")
const ArticlesMock = require("../mockData/articles.json")

module.exports = async () => {
    const users = await User.find()
    if (users.length !== UsersMock.length) {
        await createInitialEntity(User, UsersMock)
    }

    const tags = await Tag.find()
    if (tags.length !== TagsMock.length) {
        await createInitialEntity(Tag, TagsMock)
    }

    const articles = await Article.find()
    if (articles.length !== ArticlesMock.length) {
        await createInitialEntity(Article, ArticlesMock)
    }
}

async function createInitialEntity(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (e) {
                return e
            }
        })
    )
}
