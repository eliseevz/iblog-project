import {createSlice} from "@reduxjs/toolkit";
import usersService from "../services/users.service";
import authService from "../services/auth.service";
import {getLocalId, removeTokens, setTokens} from "../services/localStorage.service";

const initialState = getLocalId()
    ? {
        entities: [],
        isLoading: false,
        error: null,
        auth: getLocalId(),
        dataLoaded: false
    }
    : {
        entities: [],
        isLoading: false,
        error: null,
        auth: null,
        dataLoaded: false
    }

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequest: state => {
            state.isLoading = true
        },
        usersRequestSuccess: (state, action) => {
            state.isLoading = false
            state.entities = action.payload
            state.dataLoaded = true
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        usersSetData: (state, action) => {
            state.entities = action.payload
        },
        usersLogin: (state, action) => {
            state.auth = action.payload.userId
        },
        usersAddNewUser: (state, action) => {
            state.entities = action.payload
        },
        userLogout: (state) => {
            state.auth = null
        }
    }
})

const {reducer: tagsReducer, actions} = usersSlice
const {
    usersRequest,
    usersRequestSuccess,
    usersRequestFailed,
    usersSetData,
    usersLogin,
    usersAddNewUser,
    userLogout
} = actions

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequest())
    try {
        const {content} = await usersService.fetchAll()
        dispatch(usersRequestSuccess(content))
    } catch (e) {
        dispatch(usersRequestFailed(e.message))
    }
}

export const getUserById = (id) => (state) => {
    const user = state.users.entities.find(user => user._id === id)
    return user
}

export const getUserByNickname = (nickname) => (state) => {
    console.log(nickname, ' ник')
     const result = state.users.entities
         .find(user => user.nickname === nickname)
    return result
}

export const getUserByNicknameDisp = (nickname) => (dispatch, getState) => {
    console.log(nickname, ' ник')
    const result = getState().users.entities
        .find(user => user.nickname === nickname)
    return result
}

export const addArticle = (userId, articleId) => async (dispatch, getState) => {
    const state =  getState()
    const user = state.users.entities.find(user => user._id === userId)
    try {
        const {content} = await usersService.update(userId, {articles: [...user.articles, articleId]})
        console.log(content)
        updateUserData(state, content, dispatch)
    } catch (e) {
        console.log(e.message)
    }
}

export const removeArticle = (userId, articleId) => async (dispatch, getState) => {
    const state =  getState()
    const user = state.users.entities.find(user => user._id === state.users.auth)
    const data = {
        ...user,
        articles: user.articles.filter(art => art !== articleId) || []
    }
    try {
        console.log("Делаем апдейт")
        console.log("Список:", data.articles)
        const {content} = await usersService.update(userId, {articles: data.articles})
        console.log("Обновленный юзер: ", content)
        updateUserData(state, data, dispatch)
    } catch (e) {
        console.log(e.message)
    }
}

export const addFavorite = (id) => async (dispatch, getState) => {
    const userId = getState().users.auth
    const state =  getState()
    const user = state.users.entities.find(user => user._id === state.users.auth)
    const updatingUser = {
        favorites: user.favorites ? [...user.favorites, id] : [id]
    }
    try {
        const {content} = await usersService.update(userId, updatingUser)
        updateUserData(state, content, dispatch)
    } catch (e) {
        console.log(e.message)
    }
}

export const removeFavorite = (id) => async (dispatch, getState) => {
    const userId = getState().users.auth
    const state =  getState()
    const user = state.users.entities.find(user => user._id === state.users.auth)
    const updatingUser = {
        favorites: user.favorites.filter(fav => fav !== id)
    }
    try {
        const {content} = await usersService.update(userId, updatingUser)
        updateUserData(state, content, dispatch)
    } catch (e) {
        console.log(e.message)
    }
}

export const logIn = (data) => async (dispatch) => {
    try {
        const response = await authService.login(data)
        dispatch(usersLogin(response))
        setTokens(response)
    } catch (e) {
        dispatch(usersRequestFailed(e.response.data))
        return e
    }
}

export const logout = () => (dispatch) => {
    removeTokens()
    dispatch(userLogout())
}

export const register = (payload) => async (dispatch, getState) => {
    try {
        const userInfo = await authService.register(payload)
        setTokens(userInfo)
        const state = getState().users.entities
        dispatch(usersAddNewUser([...state, userInfo.user]))
        dispatch(usersLogin(userInfo))
        return userInfo.user
    } catch (e) {
        dispatch(usersRequestFailed(e.response.data))
        return e
    }
}


function updateUserData(state, userData, dispatch) {
    const newState = state.users.entities.filter(user => user._id !== userData._id)
    newState.push(userData)
    dispatch(usersSetData(newState))
}

export const getUsersLoadingStatus = () => state =>
    state.users.isLoading

export const getUsersDataStatus = () => state =>
    state.users.dataLoaded

export const getUsersList = () => state =>
    state.users.entities

export const getAuthData = () => state =>
    state.users.auth

export const getCurrentUser = () => (state) => {
    const user = state.users.entities.find(user => user._id === state.users.auth)
    return user
}

export const getUserError = () => (dispatch, getState) => {
    return getState().users.error
}

export const getUserErrorBySel = () => (state) => {
    return state.users.error
}


export default tagsReducer