import React from 'react';
import classes from "./articleShort.module.css"
import moment from "moment"
import {Link} from "react-router-dom";
import {useHistory} from "react-router";
import {useTags} from "../../hooks/useTags";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {addFavorite, getCurrentUser, removeFavorite} from "../../store/users";
import {getTagById} from "../../store/tags";

const ArticleShort = ({title, short, date, tags, id, author, isAuthor}) => {

    const history = useHistory()

    const dispatch = useDispatch()
    const user = useSelector(getCurrentUser())

    const handleSettings = () => {
        history.push(`/articleform/edit/${id}`)
    }

    const handleFavorite = async () => {
        if (user) {
            if (user?.favorites && user?.favorites.includes(id)) {
                dispatch(removeFavorite(id))
            } else {
                dispatch(addFavorite(id))
            }
        } else {
            toast.info("Эта функция доступна только авторизированным пользователям")
        }
    }

    const handleOpen = () => {
        history.push(`/${author}/article/${id}`)
    }

    return (
        <div className={`col-sm-4 ${classes.card}`}>
            <div to={`/${author}/article/${id}`}>
                <div className={classes.cardContent}>
                    <div role="button" onClick={handleOpen} className={classes.cardTitle}>
                        {title}
                    </div>
                    <div role="button" onClick={handleOpen} className={classes.short}>
                        {short}
                    </div>
                    <div className={`mt-4 d-flex align-items-center justify-content-between ${classes.statsBar}`}>
                        <div className="tags me-3">
                            {
                                tags.map(tag => {
                                    const tagData = dispatch(getTagById(tag))
                                    return (<span key={tagData?.value?._id} className={`${classes.tags} me-3`}>{tagData?.name}</span>)
                                })
                            }
                        </div>
                        <div className={`${classes.date}`}>
                            {
                                moment(date).format('ll')
                            }
                        </div>
                    </div>
                    {
                        isAuthor
                        ? <button onClick={handleSettings} className={`btn ${classes.bookmark}`}>
                                <i className="bi bi-pencil-square"></i>
                        </button>
                        : <button onClick={handleFavorite} className={`btn ${classes.bookmark}`}>
                                <i className={user && user?.favorites && user.favorites.includes(id) ? `bi bi-bookmark-fill` : `bi bi-bookmark`}></i>
                        </button>
                    }

                </div>
            </div>
        </div>
    );
};

export default ArticleShort;
