import React, {useEffect, useState} from 'react';
import ArticleContent from "../components/ArticleContent/articleContent";
import Breadcrumbs from "../components/breadcrumbs";
import {useDispatch, useSelector} from "react-redux";
import {getArticleById} from "../store/articles";
import CommentsComponents from "../components/commentsComponent";
import {loadCommentsList} from "../store/comments";
import {getAuthData} from "../store/users";

const Article = (props) => {

    const {author, id} = props.match.params
    const dispatch = useDispatch()
    const article = useSelector(getArticleById(id))
    const auth = useSelector(getAuthData())

    useEffect(() => {
        if (auth) {
            dispatch(loadCommentsList(id))
        }
    }, [])

    return (
        <div className="container mt-5">
            {
                article
                ? <>
                    <Breadcrumbs match={props.match} lastName={article.title}/>
                    <ArticleContent article={article}  />
                    <CommentsComponents id={id}/>
                </>
                : <p>loading</p>
            }
        </div>
    );
};

export default Article;
