import React, {useEffect} from 'react';
import {useHistory, useParams} from "react-router";
import NewArticle from "../layouts/newArticle";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../store/users";

const ArticleForm = () => {

    const history = useHistory()
    const {type, id} = useParams()
    const user = useSelector(getCurrentUser())


    if (type !== "edit" && type !== "new") {
        history.push("/")
    }

    useEffect(() => {
        if (user && user.articles) {
            if (type === "edit" && id && !user?.articles.includes(id)) {
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
