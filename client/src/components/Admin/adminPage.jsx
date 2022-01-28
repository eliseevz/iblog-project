import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import TextField from "../textField";
import {useAdmin} from "../../hooks/useAdmin";
import AdminLogin from "./adminLogin";
import AdminPanel from "./adminPanel";

const AdminPage = () => {

    const {admin, logout} = useAdmin()

    return (
        <div>
            {
                admin
                ? <AdminPanel logout={logout}/>
                : <AdminLogin/>
            }
        </div>
    );
};

export default AdminPage;
