import React, {useState} from 'react';
import TextField from "../textField";
import {confirmAlert} from "react-confirm-alert";
import articlesAPI from "../../api/articles"
import {useArticle} from "../../hooks/useArticles";
import {useUser} from "../../hooks/useUser";

const ArticlesInfo = ({articlesData}) => {

    const [search, setSearch] = useState({
        search: ""
    })

    const [data, setData] = useState(articlesData)

    // const {deleteArticle} = articlesAPI
    const {deleteArticle} = useArticle()
    const {removeArticle, getUserByNickname} = useUser()

    const handleChange = (target) => {
        setSearch({search: target.value.toLowerCase()})
    }

    const deleteArticleAndRefreshData = async (id, author) => {
        const deleted = await deleteArticle(id)
        setData(prevState => prevState.filter(art => art._id !== id))
        const user = getUserByNickname(author)
        const result = await removeArticle(user._id, id)
        console.log(deleted, ' удаление')
        console.log(result, ' удаление из юзера')
        console.log("Удаленн")
    }

    const handleDelete = (id, author) => {
        confirmAlert({
            title: `Внимание!`,
            message: `Действительно хотите удалить статью ID:${id}?`,
            buttons: [
                {
                    label: 'Удалить',
                    onClick: () => deleteArticleAndRefreshData(id, author)
                },
                {
                    label: 'Отмена',
                    onClick: () => {}
                }
            ]
        });

    }

    const searchArticle = data ? data.filter(article => article.title.toLowerCase().includes(search.search) || article.short.toLowerCase().includes(search.search)) : null

    return (
        <div>
            <TextField
                label = "поиск"
                onChange={handleChange}
                name="search"
                value={search.search}
            />
            <ul className="list-group list-group-flush">
                {
                    searchArticle.map(article => {
                        return (
                            <li key={article._id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span role="button"
                                      onClick={() => {
                                          const win = window.open(`/${article.author}/article/${article._id}`, "_blank");
                                          win.focus();
                                      }}
                                      className="t-left"
                                      style={{width: 500, textAlign: "left"}}
                                >
                                    <strong>
                                        {article.title}
                                    </strong>
                                </span>
                                <button onClick={() => handleDelete(article._id, article.author)} className="btn fs-4">
                                    <i className="bi bi-x text-danger"></i>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default ArticlesInfo;
