import React from 'react';
import CommentForm from "./commentForm";
import CommentsList from "./CommentsList";
import {useSelector} from "react-redux";
import {getAuthData} from "../store/users";

const CommentsComponents = ({id}) => {
    const isAuth = useSelector(getAuthData())
    return (
        <div className="container row mt-5 p-0">
            <div className="col-sm-6">
                <h6 className="d-flex justify-content-left mb-3">Коментарии</h6>
                {
                    isAuth
                    ? <>
                        <CommentForm id={id}/>
                        <CommentsList/>
                    </>
                    : <p className="text-muted">Комментарии доступны только авторизированным пользователям</p>
                }

            </div>
        </div>
    );
};

export default CommentsComponents;
