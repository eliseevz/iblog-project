const tags = [
    {_id: "tqks23ss", name: "Здоровье"},
    {_id: "jskwie33", name: "ИТ"},
    {_id: "kdiqwk27", name: "Наука"},
    {_id: "shqywu6r", name: "Путешествия"},
    {_id: "asnj23qs", name: "Другое"},
]

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(tags);
        }, 200);
    });

export default {
    fetchAll
}