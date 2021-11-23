let likes = [
    {articleId: "owrqtfhq01", count: 200}
]

export let likesObject = {
    "owrqtfhq01": 200,
    "owqyfgqq01": 18,
    "dqrsh902q": 1292,
    "sqlskfiwr2": 5,
    "sqlsowiwr2": 2,


}

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(likes);
        }, 200);
    });

const setLike = (id, num) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const article = likes.find(item => item.articleId === id)
            const newLikes = likes.filter(art => art.articleId !== id)
            likes = [
                ...newLikes,
                {
                    ...article,
                    count: article.count + num
                }
            ]
            resolve(id)
        }, 200);
    });

export default {
    fetchAll,
    setLike
}