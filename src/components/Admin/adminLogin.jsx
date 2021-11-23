import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import TextField from "../textField";
import {useAdmin} from "../../hooks/useAdmin";

const AdminLogin = () => {
    const initialState = {
        login: "",
        password: "",
    }
    const [data, setData] = useState(initialState)
    const [error, setError] = useState({})
    const history = useHistory()

    const {admin, login} = useAdmin()

    const handleChange = (target) => {
        setData(prevState => ({...prevState, [target.name]: target.value}))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        login(data)
    }

    return (
        <form onSubmit={submitHandler} className="d-flex justify-content-left flex-column align-items-center">
            <h2 className="mt-5 mb-5">Вход в админ панель</h2>

            <TextField
                onChange={handleChange}
                name="login"
                value={data.login}
                label="Login"
            />
            <TextField
                onChange={handleChange}
                name="password"
                value={data.password}
                label="Пароль"
                type="password"
            />
            <button type="submit" className="btn btn-primary mt-3">Войти</button>
        </form>
    );
};

export default AdminLogin;
