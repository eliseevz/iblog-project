import React, {useEffect, useState} from 'react';
import apiArticles from "../api/articles"
import ArticleContent from "../components/ArticleContent/articleContent";
import Breadcrumbs from "../components/breadcrumbs";
import {useArticle} from "../hooks/useArticles";

const Article = (props) => {

    const {author, id} = props.match.params
    const {getArticleById} = useArticle()
    const [article, setArticle] = useState()

    useEffect( () => {
        getArticle(id)
    }, [])

    useEffect(() => {
    }, [article])

    const getArticle = (id) => {
        const result = getArticleById(id)
        setArticle(result)
    }

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
