import React, {useEffect, useState} from 'react';
import {useParams} from "react-router"
import {Link} from "react-router-dom";

const Breadcrumbs = ({match, lastName}) => {

    const styles = {
        'color:': "#fff",
    }

    const [link, setLink] = useState("/")
    const [splited, setSplited] = useState(match.url.split("/").slice(1, -1))
    const dojeNames = {
        'article': 'Статьи',
    }
    console.log(lastName, ' lastName')

    const getBreadcrumbs = () => {
        const splited = match.url.split("/").slice(1, -1)
        let link = '/'
        const newBred = splited.map((item, index) => {
            if (dojeNames[item]) {
                return null
            }
            const returned = (<li key={index} className="breadcrumb-item"><Link className="link-light text-decoration-none" to={`${link}${item}`}>{item}</Link></li>)
            link = link + item + "/"
            return returned
        })
        console.log(newBred)
        return newBred
    }


    return (
        <nav styles={"--bs-breadcrumb-divider: '>';"} aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link className="link-light text-decoration-none" to="/">Главная</Link></li>
                {
                    getBreadcrumbs()
                }
                <li className="breadcrumb-item active" aria-current="page">{lastName}</li>
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
