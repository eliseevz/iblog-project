import React, {useState} from 'react';
import TextField from "./textField";
import {useHistory} from "react-router-dom"

const LoginForm = ({login}) => {
    const initialState = {
        email: "",
        password: "",
    }
    const [data, setData] = useState(initialState)
    const [error, setError] = useState({})
    const history = useHistory()

    const handleChange = (target) => {
        setData(prevState => ({...prevState, [target.name]: target.value}))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(e.target)
        const result = login(data)
        if (result) {
            result.then(data => history.push(`/${data.nickname}`))
        }
    }

    return (
        <form onSubmit={submitHandler} className="d-flex justify-content-left flex-column align-items-center">
            <TextField
                onChange={handleChange}
                name="email"
                value={data.email}
                label="Email"
                error={error.email}
            />
            <TextField
                onChange={handleChange}
                name="password"
                value={data.password}
                label="Пароль"
                error={error.password}
                type="password"
            />
            <button type="submit" className="btn btn-primary mt-3">Войти</button>
        </form>
    );
};

export default LoginForm;
