import React from 'react';
import ArticlesList from "../components/arcticlesList";
import {useHistory} from "react-router";
import {getCurrentUser} from "../store/users";
import {useSelector} from "react-redux";

const FavoritePage = () => {
    const history = useHistory()
    const user = useSelector(getCurrentUser())

    if (!user) {
        return <div className="mt-5">
            Чтобы добавить статьи в избранное необходимо <span role="button" onClick={() => history.push("/auth")}><strong>Авторизироваться</strong></span>
        </div>
    }

    if (user?.favorites && user?.favorites.length === 0 ){
        return <p className="mt-5">Пока избранного нет</p>
    }

    return (
        <div>
            {
                user.favorites
                    ? <ArticlesList
                        inArticles={user.favorites}
                    />
                    : <p className="mt-5">Пока избранного нет</p>
            }
        </div>
    );
};

export default FavoritePage;
