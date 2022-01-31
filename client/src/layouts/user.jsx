import React from 'react';
import ArticlesList from "../components/arcticlesList";

const User = ({user, isAuthor = false}) => {

    const articlesByNew = user.articles ? [...user.articles].reverse() : null

    return (
        <div className="mt-4 container">
            <div className="row">
                <div className="col-sm-3">
                    <h2 className="text-start">{user.nickname}</h2>
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
