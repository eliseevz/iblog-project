import React from 'react';
import ArticlesList from "../components/arcticlesList";
import _ from "lodash"

const User = ({user, isAuthor = false}) => {
    console.log(user, ' user in user.jsx')

    const articlesByNew = user.articles.reverse()

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
                    : <p>У вас пока нет статей</p>
            }
        </div>
    );
};

export default User;
