import React from 'react';
import moment from "moment";
import {useHistory} from "react-router";
import {getDateFrom} from "../utils/getDateFrom";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser} from "../store/users";
import {removeComment} from "../store/comments";

const CommentElement = ({comment}) => {
    const history = useHistory()
    const currentUser = useSelector(getCurrentUser())
    const dispatch = useDispatch()

    return (
        <li key={comment._id} className="list-group-item commentElement d-flex flex-column align-items-start mb-3">
            <div className="">
                <i className="bi bi-person-square me-2"></i>
                <span role="button" onClick={() => history.push(`/${comment.author}`)}>{comment.author}</span>
            </div>
            <div className="fs-6 mt-2 mb-2">{comment.content}</div>
            <div style={{fontSize: "12px"}}>{getDateFrom(comment.date)}</div>
            {
                currentUser.nickname === comment.author
                 && <span onClick={() => dispatch(removeComment(comment._id))} role="button" className="deleteCommentButton"><i className="bi bi-x"></i></span>
            }

        </li>
    );
};

export default CommentElement;
