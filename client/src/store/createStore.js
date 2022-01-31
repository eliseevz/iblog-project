import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import usersReducer from "./users";
import articlesReducer from "./articles";
import tagsReducer from "./tags";
import commentsReducer from "./comments";

const rootReducer = combineReducers(({
    users: usersReducer,
    articles: articlesReducer,
    tags: tagsReducer,
    comments: commentsReducer
}))

export const createStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}