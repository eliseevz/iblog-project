import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createComment} from "../store/comments";
import {getCurrentUser} from "../store/users";

const CommentForm = ({id}) => {

    const [data, setData] = useState("")
    const dispatch = useDispatch()
    const currentUser = useSelector(getCurrentUser())

    const handleChange = (e) => {
        setData(e.target.value)
    }

    const handleSubmit = () => {
        dispatch(createComment({
            content: data,
            author: currentUser.nickname,
            pageId: id
        }))
    }

    return (
        <div className="d-flex">
            <textarea onChange={handleChange} value={data} className="commentForm" style={{}} name="comment" cols="50" rows="5"></textarea>
            <button onClick={handleSubmit} className="btn btn-primary">SEND</button>
        </div>
    );
};

export default CommentForm;
