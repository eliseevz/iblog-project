import React from 'react';
import GraphArticles from "./graphOfArticles";


const MainInfo = ({usersData, articlesData}) => {



    return (
        <div>
             <ul className='list-unstyled card text-dark p-3'>
                 <li className="text-left">
                     Количество пользователей: {usersData?.length}
                 </li>
                 <li className="">
                     Количество статей: {articlesData?.length}
                </li>
            </ul>
            <GraphArticles
                articles={articlesData}
            />
        </div>
    );
};

export default MainInfo;
