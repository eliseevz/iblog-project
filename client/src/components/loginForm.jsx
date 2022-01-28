import React, {useEffect, useState} from 'react';
import TextField from "./textField";
import {useHistory} from "react-router-dom"
import {validator} from "../utils/validator";
import {useDispatch} from "react-redux";
import {logIn} from "../store/users";

const LoginForm = () => {
    const initialState = {
        email: "",
        password: "",
    }

    const validationConfig = {
        email: {
            isRequired: {
                message: "Поле обязательно для ввода"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Поле обязательно для ввода"
            },
            hasNumber: {
                message: "Введите хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен быть больше 6 символов",
                value: 6
            }
        }
    }

    const [data, setData] = useState(initialState)
    const [error, setError] = useState({})
    const history = useHistory()

    const dispatch = useDispatch()

    const handleChange = (target) => {
        setData(prevState => ({...prevState, [target.name]: target.value}))
    }

    useEffect(() => {
        const errors = validator(data, validationConfig)
        setError(errors)
    }, [data])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            dispatch(logIn(data))
            history.push("/")
        } catch (e) {
            setError(e)
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
