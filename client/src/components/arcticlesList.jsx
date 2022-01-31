import React, {useEffect, useState} from 'react';
import ArticleShort from "./ArticleShort/ArticleShort";
import _ from "lodash"
import Pagination from "./pagination";
import paginate from "../utils/paginate"
import {useDispatch, useSelector} from "react-redux";
import {getArticleById, getArticlesByIds, getArticlesList} from "../store/articles";

const ArticlesList = ({sortConfig = {}, inArticles, isAuthor}) => {

    const [articles, setArticles] = useState()
    const dispatch = useDispatch()
    const articlesData = useSelector(getArticlesList())

    const [currentPage, setCurrentPage] = useState(1)

    const pageSize = 6

    useEffect(() => {
        if (!inArticles) {
            setArticles(articlesData)
        } else {
            const fetchData = getArticlesById()
        }
    }, [inArticles])

    const getArticlesById = async () => {
        const data = dispatch(getArticlesByIds(inArticles))
        setArticles(data)
        return data
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
        const formatedDateArticles = articlesData.map(art => ({...art, date: new Date(art.date).getTime()}))
        if (!inArticles) {
            if (sortConfig.sort.value === "oldest") {
                filtered = _.orderBy(formatedDateArticles, ["date"], ["asc"])
            }
            if (sortConfig.sort.value === "newest") {
                filtered = _.orderBy(formatedDateArticles, ["date"], ["desc"])
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
    const cropData = filtering ? paginate(filtering, currentPage, pageSize) : null
    if (filtering?.length <= pageSize && currentPage > 1) {
        setCurrentPage(1)
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {
                    articles && cropData
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
