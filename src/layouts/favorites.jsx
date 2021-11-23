import React from 'react';
import {useUser} from "../hooks/useUser";

const Favorites = () => {

    const {user} = useUser()

    return (
        <div>
            Favorites
        </div>
    );
};

export default Favorites;
