import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import usersAPI from "../../api/users"
import User from "../../layouts/user";
import {useUser} from "../../hooks/useUser";

const AuthorPage = () => {

    const params = useParams()
    const [user, setUser] = useState()

    const {user: testUser, getUserByNickname} = useUser()

    console.log(testUser, ' test user')

    useEffect(() => {
        const result = getUserByNickname(params.author)
        setUser(result)
    }, [params])

    useEffect(() => {
        const result = getUserByNickname(params.author)
        setUser(result)
    }, [testUser])

    const localStorageUserId = JSON.parse(localStorage.getItem("user"))
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
