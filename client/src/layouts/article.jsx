import React, {useEffect, useState} from 'react';
import apiArticles from "../api/articles"
import ArticleContent from "../components/ArticleContent/articleContent";
import Breadcrumbs from "../components/breadcrumbs";
import {useSelector} from "react-redux";
import {getArticleById} from "../store/articles";

const Article = (props) => {

    const {author, id} = props.match.params
    const article = useSelector(getArticleById(id))

    return (
        <div className="container mt-5">
            {
                article
                ? <>
                    <Breadcrumbs match={props.match} lastName={article.title}/>
                    <ArticleContent article={article}  />
                </>
                : <p>loading</p>
            }
        </div>
    );
};

export default Article;
