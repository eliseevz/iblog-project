import React from 'react';
import classes from "./articleContent.module.css"
import moment from "moment";
import {useDispatch} from "react-redux";
import {getTagById} from "../../store/tags";

const ArticleContent = ({article}) => {

    const dispatch = useDispatch()

    return (
        <div>
            <div className="mainInfo d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column justify-content-start align-items-start">
                    <div className="mb-2 mt-2">
                        {
                            article.tags.map(tag => {
                                const tagData = dispatch(getTagById(tag))
                                return (<span key={tagData._id} className="badge bg-secondary me-3">{tagData.name}</span>)
                            })
                        }
                    </div>
                   <h2 className={classes.title}>{article.title}</h2>
                </div>

            </div>
            <div className={`${classes.content}`}>
                <div className={`${classes.contentText} text-justify text-left`}>
                    {
                        article.content.map((par, index) => {
                            if (index === 0) {
                                return <p className="mt-1 mb-0" key={index}>{par.content}</p>
                            }
                            return <p key={index} className={`mt-${par.margin === 1 ? 0 : 5}`}>{par.content} </p>
                        })
                    }
                </div>
            </div>
            <div className="d-flex align-items-center">
                <span className="text-secondary">{ moment(article.date).format('ll') }</span>
            </div>
        </div>
    );
};

export default ArticleContent;
