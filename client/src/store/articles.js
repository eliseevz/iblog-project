import {createSlice} from "@reduxjs/toolkit";
import articlesService from "../services/articles.service";
import {generateId} from "../utils/generateId";


const articlesSlice = createSlice({
    name: "articles",
    initialState: {
        entities: [],
        isLoading: false,
        error: null,
        dataLoaded: false
    },
    reducers: {
        articlesRequest: state => {
            state.isLoading = true
        },
        articlesRequestSuccess: (state, action) => {
            state.isLoading = false
            state.entities = action.payload
            state.dataLoaded = true
        },
        articlesRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        updateArticles: (state, action) => {
            state.entities = action.payload
        }
    }
})

const {reducer: articlesReducer, actions} = articlesSlice
const {
    articlesRequest,
    articlesRequestSuccess,
    articlesRequestFailed,
    updateArticles
} = actions

export const loadArticlesList = () => async (dispatch) => {
    dispatch(articlesRequest())
    try {
        const {content} = await articlesService.fetchAll()
        dispatch(articlesRequestSuccess(content))
    } catch (e) {
        dispatch(articlesRequestFailed(e.message))
    }
}

export const updateArticle = (id, payload) => async (dispatch, getState) => {
    const state = getState()
    try {
        const {content} = await articlesService.update(id, payload)
        const newArticles = state.articles.entities.filter(a => a._id !== content._id)
        newArticles.push(content)
        dispatch(updateArticles(newArticles))
        return content
    } catch (e) {
        console.log(e.message)
    }
}

export const addNewArticle = (payload) => async (dispatch, getState) => {
    const state = getState()
    try {
        const {content} = await articlesService.add(payload)
        console.log(content, " respone add article")
        const newArticles = [...state.articles.entities, content]
        dispatch(updateArticles(newArticles))
        return content
    } catch (e) {
        console.log(e.message)
    }
}

export const removeArticleFromList = (id) => async (dispatch, getState) => {
    const state = getState().articles.entities
    const newState = state.filter(a => a._id !== id)
    try {
        await articlesService.delete(id)
    } catch (e) {
        console.log(e)
    }
    dispatch(updateArticles(newState))
    return newState
}


export const getArticleById = (id) => (state) => {
    return state.articles.entities.find(a => a._id === id)
}

export const getArticlesByIds = (ids) => (dispatch, getState) => {
    const state = getState().articles.entities
    const articles = ids.map(id => state.find(a => a._id === id))
    return articles
}

export const getArticlesLoadingStatus = () => state =>
    state.articles.isLoading

export const getArticlesList = () => state =>
    state.articles.entities

export const getArticlesDataStatus = () => state =>
    state.articles.dataLoaded

export default articlesReducer