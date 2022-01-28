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
            state.auth = action.payload.localId
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
     const result = state.users.entities
         .find(user => user.nickname === nickname)
    return result
}

export const addArticle = (userId, articleId) => async (dispatch, getState) => {
    const state =  getState()
    const user = state.users.entities.find(user => user._id === state.users.auth)
    const data = {
        ...user,
        articles: user.articles ? [...user.articles, articleId] : [articleId]
    }
    console.log(data, ' update user data')
    try {
        await usersService.update(userId, data)

        // const newState = state.users.entities.filter(user => user._id !== userId)
        // newState.push(data)
        // dispatch(usersSetData(newState))
        updateUserData(state, data, dispatch)
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
        await usersService.update(userId, data)
        // const newState = state.users.entities.filter(user => user._id !== userId)
        // newState.push(data)
        // dispatch(usersSetData(newState))
        updateUserData(state, data, dispatch)
    } catch (e) {
        console.log(e.message)
    }
}

export const addFavorite = (id) => async (dispatch, getState) => {
    const userId = getState().users.auth
    const state =  getState()
    const user = state.users.entities.find(user => user._id === state.users.auth)
    const newUser = {
        ...user,
        favorites: user.favorites ? [...user.favorites, id] : [id]
    }
    try {
        await usersService.update(userId, newUser)
        updateUserData(state, newUser, dispatch)
    } catch (e) {
        console.log(e.message)
    }
}

export const removeFavorite = (id) => async (dispatch, getState) => {
    const userId = getState().users.auth
    const state =  getState()
    const user = state.users.entities.find(user => user._id === state.users.auth)
    const newUser = {
        ...user,
        favorites: user.favorites.filter(fav => fav !== id)
    }
    try {
        await usersService.update(userId, newUser)
        // const newState = state.users.entities.filter(user => user._id !== userId)
        // newState.push(newUser)
        // dispatch(usersSetData(newState))
        updateUserData(state, newUser, dispatch)
    } catch (e) {
        console.log(e.message)
    }
}

export const logIn = (data) => async (dispatch) => {
    console.log('процесс логирования пошел')
    try {
        const response = await authService.login(data)
        dispatch(usersLogin(response))
        setTokens(response)
    } catch (e) {
        console.log(e.message)
    }
}

export const logout = () => (dispatch) => {
    removeTokens()
    dispatch(userLogout())
}

export const register = ({email, password, ...rest}) => async (dispatch, getState) => {
    try {
        const response = await authService.register({email, password})
        console.log(response, ' this is response')
        const newUser = {
            email,
            ...rest,
            _id: response.localId
        }
        const res = await usersService.create(newUser)
        const state = getState().users.entities
        dispatch(usersAddNewUser([...state, newUser]))
        dispatch(logIn({email, password}))
        return newUser
    } catch (e) {
        console.log(e.message)
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


export default tagsReducer