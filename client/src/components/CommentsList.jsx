import React from 'react';
import {useSelector} from "react-redux";
import {getCommentsDataStatus, getCommentsList} from "../store/comments";
import CommentElement from "./commentsElement";
import _ from "lodash"

const CommentsList = () => {

    const comments = useSelector(getCommentsList())
    const commentsDataStatus = useSelector(getCommentsDataStatus())

    console.log(comments, ' this is comments')

    const sortedComments = comments
        ? _.orderBy(comments, ["date"], ["desc"])
        : comments

    if (comments.length === 0) {
        return <p className="mt-5">Комментариев еще нет</p>
    }

    return (
        <ul className="list-group mt-3">
            {
                commentsDataStatus
                ? sortedComments.map(comment => <CommentElement key={comment._id} comment={comment}/>)
                : <p>loading</p>
            }
        </ul>
    );
};

export default CommentsList;
