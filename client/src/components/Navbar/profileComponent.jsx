import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser, logout} from "../../store/users";


const ProfileComponent = () => {

    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch()
    const currentUser = useSelector(getCurrentUser())

    const history = useHistory()

    return (
        <li className="nav-item dropdown">
            <div className="d-flex align-items-center"
                 onClick={() => setIsOpen(prevState => !prevState)}
            >
                <i className="bi bi-person-circle"></i>
                <div className="nav-link dropdown-toggle link-light" id="navbarDarkDropdownMenuLink" role="button"
                   data-bs-toggle="dropdown" aria-expanded="false">
                    {currentUser.nickname}
                </div>
            </div>
                {
                    isOpen
                    ? <ul onClick={() => setIsOpen(prevState => !prevState)} className="dropdown-menu dropdown-menu-dark d-block" aria-labelledby="navbarDarkDropdownMenuLink">
                            <li><Link className="dropdown-item" to={`/${currentUser.nickname}`} exact>Моя страница</Link></li>
                            <li><Link className="dropdown-item" to={`/articleform/new/${currentUser._id}`}>+ Создать новую статью</Link></li>
                            <li><a onClick={() => dispatch(logout())} className="dropdown-item text-danger" href="#">Выйти</a></li>
                    </ul>
                    : null
                }
        </li>
    );
};

export default ProfileComponent;
