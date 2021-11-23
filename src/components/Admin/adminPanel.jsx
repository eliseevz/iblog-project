import React, {useEffect, useState} from 'react';
import articlesAPI from "../../api/articles"
import usersAPI from "../../api/users"
import ArticlesInfo from "./articlesInfo";
import UsersInfo from "./usersInfo";
import MainInfo from "./mainInfo";
import SideBar from "./sideBar";
import classes from "./admin.module.css"
import AdminMockData from "./adminMockData";
import {useArticle} from "../../hooks/useArticles";
import {useUser} from "../../hooks/useUser";

const AdminPanel = ({logout}) => {

    const {articles} = useArticle()
    const {users} = useUser()


    const [tabsControl, setTabsControl] = useState(null)
    const [tabs, setTabs] = useState(null)


    useEffect(() => {
        fetchAllData()
    }, [articles, users])

    const fetchAllData = async () => {
        const articlesData = articles
        const usersData = users

        const tabsControlInitialState = {
            info: {
                name: "info",
                label: "Основная информация",
                Component: MainInfo,
                data: {usersData, articlesData}
            },
            users: {
                name: "users",
                label: "Пользователи",
                Component: UsersInfo,
                data: {usersData}
            },
            articles: {
                name: "articles",
                label: "Статьи",
                Component: ArticlesInfo,
                data: {articlesData}
            },
            mocData: {
                name: "mocData",
                label: "mocData",
                Component: AdminMockData,
                data: {}
            },
            logout: {
                name: "exit",
                label: "Выйти",
                action: logout,
                color: "danger",
            }
        }

        setTabsControl(tabsControlInitialState)
        setTabs(tabsControlInitialState["info"])
    }

    return (
        <div>
            <h2 className="mt-5">Панель администратора</h2>
            <div className="mt-5 container">
                {
                    users && articles && tabs && tabsControl
                    ?
                    <div className="row d-flex">
                        <div className="sideBar col-3">
                            <SideBar data={tabsControl} selected={tabs} setData={setTabs}/>
                        </div>
                        <div className="content col-sm-6">
                            <div className="stats">
                                <tabs.Component {...tabs.data}/>
                            </div>
                        </div>
                    </div>
                    : <p>loading</p>
                }
            </div>
        </div>
    );
};

export default AdminPanel;
