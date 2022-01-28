import React, {useContext, useEffect, useState} from "react"
import articlesService from "../services/articles.service";
import {toast} from "react-toastify";
import {generateId} from "../utils/generateId";

const ArticleContext = React.createContext()

export const useArticle = () => {
    return useContext(ArticleContext)
}

export const ArticleProvider = ({children}) => {

    const [articles, setArticles] = useState(null)

    useEffect(() => {
        fetchArticles()
    }, [])

    const fetchArticles = async () => {
        const data = await articlesService.fetchAll()
        setArticles(data.content)
        return data
    }

    const getArticleById = (id) => {
        return articles.find(art => art._id === id)
    }

    const updateArticle = async (id, data) => {
        try {
            const result = await articlesService.update(id, data)
            console.log(result, ' result of update')
            return data
        } catch (e) {
            toast.error("Что то пошло не так")
        }
    }

    const addNewArticle = async (data, author) => {
        const newArt = {
            ...data,
            _id: generateId(10),
            author: author,
            date: new Date().getTime()
        }
        const result = await articlesService.add(newArt)
        console.log(result, " result of add new art")
        return newArt
    }

    const deleteArticle = async (id) => {
        const result = articlesService.delete(id)
    }

    return <ArticleContext.Provider value={{articles, fetchArticles, getArticleById, updateArticle, addNewArticle, deleteArticle}}>
        {
            articles
            ? children
            : <p>loading</p>
        }
    </ArticleContext.Provider>
}