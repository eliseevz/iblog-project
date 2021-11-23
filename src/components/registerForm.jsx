import React, {useEffect, useState} from 'react';
import TextField from "./textField";
import {validator} from "../utils/validator";

const RegisterForm = () => {

    const initialState = {
        email: "",
        nickname: "",
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
        nickname: {
            isRequired: {
                message: "Поле обязательно для ввода"
            },
            min: {
                message: "Никнейм должен состоять хотя бы из 4 символов",
                value: 4
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

    useEffect(() => {
        const errors = validator(data, validationConfig)
        setError(errors)
    }, [data])

    const handleChange = (target) => {
        setData(prevState => ({...prevState, [target.name]: target.value}))
    }

    return (
        <form className="d-flex justify-content-left flex-column align-items-center">
            <TextField
                onChange={handleChange}
                name="email"
                value={data.email}
                label="Email"
                error={error.email}
            />
            <TextField
                onChange={handleChange}
                name="nickname"
                value={data.nickname}
                label="Никнейм"
                error={error.nickname}
            />
            <TextField
                onChange={handleChange}
                name="password"
                value={data.password}
                label="Пароль"
                error={error.password}
                type="password"
            />
            <button type="submit" className="btn btn-primary mt-3">Зарегистрироваться</button>
        </form>
    );
};

export default RegisterForm;
