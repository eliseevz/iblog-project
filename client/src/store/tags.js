import {createSlice} from "@reduxjs/toolkit";
import tagsService from "../services/tags.service";


const tagsSlice = createSlice({
    name: "tags",
    initialState: {
        entities: [],
        isLoading: false,
        error: null,
        dataLoaded: false
    },
    reducers: {
        tagsRequest: state => {
            state.isLoading = true
        },
        tagsRequestSuccess: (state, action) => {
            state.isLoading = false
            state.entities = action.payload
            state.dataLoaded = true
        },
        tagsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const {reducer: tagsReducer, actions} = tagsSlice
const {tagsRequest, tagsRequestSuccess, tagsRequestFailed} = actions

export const loadTagsList = () => async (dispatch) => {
    dispatch(tagsRequest())
    try {
        const {content} = await tagsService.fetchAll()
        dispatch(tagsRequestSuccess(content))
    } catch (e) {
        dispatch(tagsRequestFailed(e.message))
    }
}

export const getTagsLoadingStatus = () => state =>
    state.tags.isLoading

export const getTagsDataStatus = () => state =>
    state.tags.dataLoaded

export default tagsReducer