import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import TextField from "../textField";
import {useAdmin} from "../../hooks/useAdmin";
import AdminLogin from "./adminLogin";
import AdminPanel from "./adminPanel";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../../store/users";

const AdminPage = () => {

    const {admin, logout} = useAdmin()
    const currentUser = useSelector(getCurrentUser())

    return (
        <div>
            {
                currentUser?.isAdmin
                ? <AdminPanel logout={logout}/>
                // : <AdminLogin/>
                : <p>У вас нет доступа к панели администратора</p>
            }
        </div>
    );
};

export default AdminPage;
