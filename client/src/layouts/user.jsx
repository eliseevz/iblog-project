import React from 'react';
import ArticlesList from "../components/arcticlesList";

const User = ({user, isAuthor = false}) => {

    const articlesByNew = user.articles ? user.articles.reverse() : null

    return (
        <div className="mt-4 container">
            <div className="row">
                <div className="col-sm-3">
                    <h2 className="text-start">{user.nickname}</h2>
                </div>
            </div>
            {
                user.articles
                    ?<ArticlesList
                        // inArticles={user.articles}
                        inArticles={articlesByNew}
                        isAuthor={isAuthor}
                    />
                    : <p>Статей пока нет</p>
            }
        </div>
    );
};

export default User;
