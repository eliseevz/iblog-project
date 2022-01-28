
let users = [
    {
        nickname: "eliseevz",
        email: "eliseev.vv01@gmail.com",
        password: "123456Q",
        articles: ["qwrqtfhq01", "owhqsfhq01"],
        favorites: ["owrqtgfq01"],
        _id: "rqsgd23w"
    },
    // {
    //     nickname: "lizok",
    //     email: "lizakot20@gmail.com",
    //     password: "123456W",
    //     articles: ["dqrsh902q", "sqlskfiwr2"],
    //     favorites: ["owqyfgqq01"],
    //     id: "sfaqwg63s"
    //
    // },
    {
        nickname: "test",
        email: "test",
        password: "test",
        articles: ["owrqtgfq01"],
        favorites: [],
        _id: "rldoq99w"
    }
]

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(users);
        }, 400);
    });

const getByNickname = (nickname) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const user = users.find(user => user.nickname.toLowerCase() === nickname.toLowerCase())
            resolve(user)
        }, 400);
    });

const remove = (nickname) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const newUsers = users.filter(user => user.nickname.toLowerCase() !== nickname.toLowerCase())
            users = newUsers
            resolve(newUsers)
        }, 400);
    });

const add = (data) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            users.push(data)
            resolve(data)
        }, 400);
    });


const addNewArticle = (articleId, nickname) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const newUsers = users.filter(user => user.nickname !== nickname)
            const newUser = users.find(user => user.nickname === nickname)
            newUser.articles.push(articleId)
            users = [...newUsers, newUser]
            resolve(newUser)
        }, 400);
    });

export default {
    fetchAll,
    getByNickname,
    add,
    addNewArticle
}