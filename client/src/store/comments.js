import {createSlice} from "@reduxjs/toolkit";
import commentsService from "../services/comments.service";
import {generateId} from "../utils/generateId";
import httpService from "../services/http.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: [],
        isLoading: false,
        dataLoaded: false,
        error: null
    },
    reducers: {
        commentsRequest: (state) => {
            state.isLoading = true
        },
        commentsRequestSuccess: (state, action) => {
            state.entities = action.payload
            state.dataLoaded = true
            state.isLoading = false
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        updateComments: (state, action) => {
            state.entities = action.payload
        }
    }
})

const {reducer: commentsReducer, actions} = commentsSlice
const {commentsRequest, commentsRequestSuccess, commentsRequestFailed, updateComments} = actions

export const createComment = (data) => async (dispatch, getState) => {
    const state = getState().comments.entities
    try {
        const {content} = await commentsService.createComment(data)
        dispatch(updateComments([...state, content]))
    } catch (e) {
        console.log(e.message)
    }
}

export const removeComment = (id) => async (dispatch, getState) => {
    const state = getState().comments.entities
    try {
        await commentsService.removeComment(id)
        const newEntities = state.filter(comm => comm._id !== id)
        dispatch(updateComments(newEntities))
    } catch (e) {
        console.log(e.message)
    }
}

export const loadCommentsList = (pageId) => async (dispatch) => {
    dispatch(commentsRequest())
    try {
        const {content} = await commentsService.getComments(pageId)
        dispatch(commentsRequestSuccess(content))
    } catch (e) {
        dispatch(commentsRequestFailed(e.message))
    }
}

export const getCommentsList = () => (state) => {
    return state.comments.entities
}

export const getCommentsDataStatus = () => (state) => {
    return state.comments.dataLoaded
}

export default commentsReducer