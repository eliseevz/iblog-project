import React from 'react';
import AdminPanel from "./adminPanel";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../../store/users";

const AdminPage = () => {

    const currentUser = useSelector(getCurrentUser())

    return (
        <div>
            {
                currentUser?.isAdmin
                ? <AdminPanel/>
                // : <AdminLogin/>
                : <p>У вас нет доступа к панели администратора</p>
            }
        </div>
    );
};

export default AdminPage;
