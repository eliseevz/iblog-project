import React, {useEffect, useState} from 'react';
import apiArt from "../api/articles"
import ArticleShort from "./ArticleShort/ArticleShort";
import _ from "lodash"
import {useArticle} from "../hooks/useArticles";
import Pagination from "./pagination";
import paginate from "../utils/paginate"

const ArticlesList = ({sortConfig = {}, inArticles, isAuthor}) => {

    const [articles, setArticles] = useState()
    const {articles: articlesData, fetchArticles: fetchAllArticles, getArticleById: getById} = useArticle()
    const [currentPage, setCurrentPage] = useState(1)

    const pageSize = 6

    useEffect(() => {
        if (!inArticles) {
            fetchAllArticles()
                .then(data => setArticles(data.content))
        } else {
            const fetchData = getArticlesById()
        }
    }, [inArticles])

    const getArticlesById = async () => {
        const result = inArticles.map(async art => {
            const data = await getById(art)
            return data
        })
        const resultData = await Promise.all(result)
        setArticles(resultData)
        return resultData
    }

    const getSimilarTags = (article, sortConfig) => {
        let result = false
        article.forEach(artTag => {
            sortConfig.forEach(confTag => {
                if (confTag.value._id == artTag) {
                    result = true
                }
            })
        })
        return result
    }

    const filterArticles = () => {
        let filtered = articles
        if (!inArticles) {
            if (sortConfig.sort.value === "oldest") {
                filtered = _.orderBy(articles, ["date"], ["asc"])
            }
            if (sortConfig.sort.value === "newest") {
                filtered = _.orderBy(articles, ["date"], ["desc"])
            }
            if (sortConfig.tags.length !== 0) {
                filtered = filtered.filter(article => {
                    return getSimilarTags(article.tags, sortConfig.tags)
                })
            }
            if (sortConfig.search !== "") {
                filtered = filtered.filter(article => {
                    return article.title.toLowerCase().includes(sortConfig.search.trim().toLowerCase())
                        || article.short.toLowerCase().includes(sortConfig.search.trim().toLowerCase())
                })
            }
        }
        return filtered
    }

    const filtering = filterArticles()
    const cropData = paginate(filtering, currentPage, pageSize)
    if (filtering?.length <= pageSize && currentPage > 1) {
        setCurrentPage(1)
    }
    console.log(cropData, ' cropData')

    return (
        <div className="container mt-4">
            <div className="row">
                {
                    articles
                    ? cropData.map(article => (
                            <ArticleShort
                                title={article.title}
                                short={article.short}
                                date={article.date}
                                tags={article.tags}
                                id={article._id}
                                likes={article.likes}
                                author={article.author}
                                key={article._id}
                                isAuthor={isAuthor}
                            />
                        ))
                    : <p>loading</p>
                }
                <Pagination
                    content={filtering}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    setPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ArticlesList;
