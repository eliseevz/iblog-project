import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router";
import NewArticle from "../../layouts/newArticle";
import {useUser} from "../../hooks/useUser";
import apiTags from "../../api/tags";

const ArticleForm = () => {

    const history = useHistory()
    const {type, id} = useParams()
    const {user} = useUser()


    if (type !== "edit" && type !== "new") {
        history.push("/")
    }

    useEffect(() => {
        if (user) {
            console.log(user)
            if (type === "edit" && id && !user.articles.includes(id)) {
                history.push("/")
            }
            if (type === 'new' && id !== user._id) {
                history.push("/")
            }
        }
    }, [user, type])


    return (
        <div>
            { user
                ? <>
                    {
                        type === "edit"
                        ? <NewArticle userNickname={user.nickname} type="edit" articleId={id}/>
                        : <NewArticle userNickname={user.nickname} type="new" userId={user._id}/>
                    }
                </>
                : <p>Loading</p>
            }
        </div>
    );
};

export default ArticleForm;
