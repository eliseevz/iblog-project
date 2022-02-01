import React from 'react';
import {Link} from "react-router-dom";
import {useTheme} from "../hooks/useTheme";

const Breadcrumbs = ({match, lastName}) => {

    const {mode} = useTheme()

    const dojeNames = {
        'article': 'Статьи',
    }

    const getBreadcrumbs = () => {
        const splited = match.url.split("/").slice(1, -1)
        let link = '/'
        const newBred = splited.map((item, index) => {
            if (dojeNames[item]) {
                return null
            }
            const returned = (<li key={index} className="breadcrumb-item"><Link className={`${mode === "day" ? "link-dark" : "link-light"} text-decoration-none`} to={`${link}${item}`}>{item}</Link></li>)
            link = link + item + "/"
            return returned
        })
        return newBred
    }


    return (
        <nav styles={"--bs-breadcrumb-divider: '>';"} aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link className={`${mode === "day" ? "link-dark" : "link-light"} text-decoration-none`} to="/">Главная</Link></li>
                {
                    getBreadcrumbs()
                }
                <li className="breadcrumb-item active" aria-current="page">{lastName}</li>
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
