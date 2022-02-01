import React, {useEffect, useState} from 'react';
import TextField from "../textField";
import {confirmAlert} from "react-confirm-alert";
import Pagination from "../pagination";
import paginate from "../../utils/paginate";
import {useDispatch} from "react-redux";
import {getUserByNicknameDisp, removeArticle} from "../../store/users";
import {removeArticleFromList} from "../../store/articles";
import {removeComment} from "../../store/comments";
import commentsService from "../../services/comments.service";

const ArticlesInfo = ({articlesData}) => {

    const [search, setSearch] = useState({
        search: ""
    })

    const [data, setData] = useState(articlesData)
    const [page, setPage] = useState(1)
    const [comments, setComments] = useState(false)
    const dispatch = useDispatch()

    const [commentList, setCommentList] = useState(false)

    const pageSize = 8

    const handleChange = (target) => {
        setSearch({search: target.value.toLowerCase()})
    }

    const deleteArticleAndRefreshData = async (id, author) => {
        setData(prevState => prevState.filter(art => art._id !== id))
        const user = dispatch(getUserByNicknameDisp(author))
        dispatch(removeArticle(user._id, id))
        dispatch(removeArticleFromList(id))
    }

    const deleteArticle = (id) => {
        dispatch(removeComment(id))
        setCommentList(prevState => prevState.filter(comm => comm._id !== id))
    }

    const toggleComments = (id) => {
        if (!comments) {
            setComments(id)
        }
        if (comments === id) {
            setComments(false)
        }
        if (comments && comments !== id) {
            setComments(id)
        }
    }

    useEffect(async () => {
        try {
            if (comments) {
                const {content} = await commentsService.getComments(comments)
                setCommentList(content)
                return
            }
            setCommentList(false)
        } catch (e) {
            console.log(e)
        }

    }, [comments])

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

    const handleDeleteComment = (id) => {
        confirmAlert({
            title: `Внимание!`,
            message: `Действительно хотите комментарий?`,
            buttons: [
                {
                    label: 'Удалить',
                    onClick: () => deleteArticle(id)
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
                            <>
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
                                <button onClick={() => toggleComments(article._id)} className="btn btn-dark me-2 d-flex">
                                    <i className="bi bi-list-task"></i>
                                </button>
                                <button onClick={() => handleDelete(article._id, article.author)} className="btn btn-danger pl-1 pr-1 pb-0 pt-0 fs-4">
                                    <i className="bi bi-x text-white"></i>
                                </button>
                            </li>
                                {
                                    article._id === comments &&
                                        <div>
                                            {
                                            commentList && commentList.length !== 0
                                                ? <ul className="list-group list-group-flush">
                                                    {
                                                        commentList.map(item => {
                                                            return <li className="list-group-item bg-light d-flex justify-content-between align-items-center text-muted">
                                                                    <div>
                                                                        <strong
                                                                            role="button"
                                                                            onClick={() => {
                                                                                const win = window.open(`/${article.author}`, "_blank");
                                                                                win.focus();
                                                                            }}
                                                                            className="me-2"
                                                                        >
                                                                            {item.author}:
                                                                        </strong>
                                                                        {item.content}
                                                                    </div>
                                                                    <button onClick={() => handleDeleteComment(item._id)} className="btn">
                                                                        <i className="bi bi-x text-danger fs-5"></i>
                                                                    </button>
                                                                </li>
                                                        })
                                                    }
                                                </ul>
                                                : <div className="pt-2 pb-2 bg-light text-dark">Коментариев нет</div>
                                            }
                                        </div>
                                }
                            </>
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
