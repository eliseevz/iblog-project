import React, {useState} from 'react';
import {useUser} from "../../hooks/useUser";
import {Link, useHistory} from "react-router-dom";


const ProfileComponent = () => {

    const [isOpen, setIsOpen] = useState(false)
    const {logout, user, users} = useUser()
    const history = useHistory()

    return (
        <li className="nav-item dropdown">
            <div className="d-flex align-items-center"
                 onClick={() => setIsOpen(prevState => !prevState)}
            >
                <i className="bi bi-person-circle"></i>
                <div className="nav-link dropdown-toggle link-light" id="navbarDarkDropdownMenuLink" role="button"
                   data-bs-toggle="dropdown" aria-expanded="false">
                    {user.nickname}
                </div>
            </div>
                {
                    isOpen
                    ? <ul onClick={() => setIsOpen(prevState => !prevState)} className="dropdown-menu dropdown-menu-dark d-block" aria-labelledby="navbarDarkDropdownMenuLink">
                            <li><Link className="dropdown-item" to={`/articleform/new/${user._id}`}>Создать новую статью</Link></li>
                            <li><Link className="dropdown-item" to={`/${user.nickname}`} exact>Моя страница</Link></li>
                            <li><a onClick={() => logout()} className="dropdown-item text-danger" href="#">Выйти</a></li>
                    </ul>
                    : null
                }
        </li>
    );
};

export default ProfileComponent;
