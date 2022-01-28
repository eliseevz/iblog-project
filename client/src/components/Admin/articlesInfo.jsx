import React, {useState} from 'react';
import TextField from "../textField";
import {confirmAlert} from "react-confirm-alert";
import Pagination from "../pagination";
import paginate from "../../utils/paginate";
import {useDispatch} from "react-redux";
import {getUserByNickname, removeArticle} from "../../store/users";
import {removeArticleFromList} from "../../store/articles";

const ArticlesInfo = ({articlesData}) => {

    const [search, setSearch] = useState({
        search: ""
    })

    const [data, setData] = useState(articlesData)
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()

    const pageSize = 1


    const handleChange = (target) => {
        setSearch({search: target.value.toLowerCase()})
    }

    const deleteArticleAndRefreshData = async (id, author) => {
        const result = dispatch(removeArticleFromList(id))
        setData(result)
        const user = dispatch(getUserByNickname(author))
        dispatch(removeArticle(user._id, id))
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
    const cropAricles = paginate(searchArticle, page, pageSize)

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
                    cropAricles.map(article => {
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
            <Pagination
                setPage={setPage}
                content={searchArticle}
                currentPage={page}
                pageSize={pageSize}
            />
        </div>
    );
};

export default ArticlesInfo;
