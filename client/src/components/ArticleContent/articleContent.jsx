import React, {useState} from 'react';
import classes from "./articleContent.module.css"
import moment from "moment";
import {useTags} from "../../hooks/useTags";

const ArticleContent = ({article}) => {

    const {getTagById} = useTags()

    return (
        <div>
            <div className="mainInfo d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column justify-content-start align-items-start">
                    <div className="mb-2 mt-2">
                        {
                            article.tags.map(tag => {
                                const tagData = getTagById(tag)
                                return (<span key={tagData.value._id} className="badge bg-secondary me-3">{tagData.label}</span>)
                            })
                        }
                    </div>
                   <h2 className={classes.title}>{article.title}</h2>
                </div>

            </div>
            <div className={`${classes.content}`}>
                <div className={`${classes.contentText} text-justify text-left`}>
                    {
                        article.content.map(item => <><p>{item}</p> <br/> </>)
                    }
                </div>
            </div>
            <div className="d-flex align-items-center">
                <span className="text-secondary">{ moment(Number(article.date)).format('ll') }</span>
            </div>
        </div>
    );
};

export default ArticleContent;
