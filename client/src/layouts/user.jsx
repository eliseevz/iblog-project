import React from 'react';
import ArticlesList from "../components/arcticlesList";

const User = ({user, isAuthor = false}) => {

    const articlesByNew = user.articles ? [...user.articles].reverse() : null

    return (
        <div className="mt-4 container">
            <div className="row">
                <div className="col-sm-3">
                    <h2 className="text-start d-flex align-items-center">
                        <i className="bi bi-person-circle me-3 fs-4"></i>
                        <span>{user.nickname}</span>
                    </h2>
                </div>
            </div>
            {
                user.articles.length > 0
                    ? <ArticlesList
                        inArticles={articlesByNew}
                        isAuthor={isAuthor}
                    />
                    : <p className="mt-5">Статей пока нет</p>
            }
        </div>
    );
};

export default User;
