import React from 'react';

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
        </div>
    );
};

export default MainInfo;
