import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import User from "../layouts/user";
import {getLocalId} from "../services/localStorage.service";
import {useSelector} from "react-redux";
import {getCurrentUser, getUserByNickname} from "../store/users";

const AuthorPage = () => {

    const params = useParams()
    const [user, setUser] = useState()

    const testUser = useSelector(getCurrentUser())
    const result = useSelector(getUserByNickname(params.author))

    useEffect(() => {
        setUser(result)
    }, [params, testUser])

    const localStorageUserId = getLocalId()
    const isAuthor = user?._id === localStorageUserId

    return (
        <div>
            {
                user
                ? <>
                    {
                        isAuthor
                        ? <User user={user} isAuthor={isAuthor}/>
                        : <User user={user} />
                    }
                </>
                : <p>Loading suka</p>
            }
        </div>
    );
};

export default AuthorPage;
