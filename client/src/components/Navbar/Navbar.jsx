import React from 'react';
import {NavLink} from "react-router-dom"
import classes from "./navbar.module.css"
import logo from "../../assets/logo.png"
import ProfileComponent from "./profileComponent";
import Switcher from "../SwitchMode/Switcher";
import {useSelector} from "react-redux";
import {getAuthData} from "../../store/users";

const NavBar = () => {

    const authStatus = useSelector(getAuthData())

    return (
        <div className={`${classes.navbar} bg-dark pt-4 pb-4`}>
            <ul className="nav container align-items-center justify-content-between">
                <ul className="nav">
                    <li className="nav-item me-5">
                        <NavLink activeClassName="active text-danger" className="nav-link p-0 text-light" to="/">
                            <img style={{height: 45}} src={logo} alt="logo"/>
                        </NavLink>
                    </li>
                    <li className="nav-item d-flex align-items-center me-3">
                        <NavLink activeClassName="active text-danger" className="nav-link text-light" to="/">Все статьи</NavLink>
                    </li>
                    {authStatus && <li className="nav-item d-flex align-items-center">
                        <NavLink activeClassName="active text-danger" className="nav-link text-light" to="/favorites">Избранное</NavLink>
                    </li>
                    }

                </ul>
                <ul className="nav me-5">
                    <li className="nav-item d-flex align-items-center me-5">
                        <Switcher/>
                    </li>
                    {
                        authStatus
                        ? <ProfileComponent/>
                        : <li className="nav-item me-5 d-flex align-items-center">
                                <NavLink activeClassName="active text-danger" className="nav-link text-light" to="/auth">Авторизация</NavLink>
                        </li>
                    }

                    {/*<li className="nav-item me-5 d-flex align-items-center">*/}
                    {/*    <NavLink activeClassName="active text-danger" className="nav-link text-light" to="/auth/register">Зарегистрироваться</NavLink>*/}
                    {/*</li>*/}
                </ul>
            </ul>
        </div>
    );
};

export default NavBar;
