import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsersDataStatus, loadUsersList} from "../store/users";
import {getArticlesDataStatus, loadArticlesList} from "../store/articles";
import {getTagsDataStatus, loadTagsList} from "../store/tags";
import {getLocalId} from "../services/localStorage.service";

const AppLoader = ({children}) => {

    const dispatch = useDispatch()

    const usersDataStatus = useSelector(getUsersDataStatus())
    const tagsDataStatus = useSelector(getTagsDataStatus())
    const articlesDataStatus = useSelector(getArticlesDataStatus())

    useEffect(() => {
        dispatch(loadUsersList())
        dispatch(loadArticlesList())
        dispatch(loadTagsList())
    })

    return (
        <>
            {
                usersDataStatus && tagsDataStatus && articlesDataStatus
                ? children
                :   <p>loading</p>
            }
        </>
    );
};

export default AppLoader;
