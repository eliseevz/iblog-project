import React from 'react';
import classes from "./footer.module.css";
import {NavLink} from "react-router-dom";
import ProfileComponent from "../Navbar/profileComponent";

const Footer = () => {
    return (
        <div className={`${classes.footer} bg-dark pt-4 pb-4`}>
            <ul className="nav container align-items-center justify-content-between">
                <span>Все права защищены.</span>
            </ul>
        </div>
    );
};

export default Footer;
