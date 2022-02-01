import React, {useEffect, useState} from 'react';
import TextField from "./textField";
import {validator} from "../utils/validator";
import {useDispatch, useSelector} from "react-redux";
import {getUserErrorBySel, register} from "../store/users";
import {useHistory} from "react-router";

const RegisterForm = () => {

    const history = useHistory()

    const userError = useSelector(getUserErrorBySel())

    useEffect(() => {
        if (userError) {
            setError(prevState => ({...prevState, [userError.name]: userError.message}))
        }
    }, [userError])

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

    const dispatch = useDispatch()

    useEffect(() => {
        const errors = validator(data, validationConfig)
        setError(errors)
    }, [data])

    const handleChange = (target) => {
        setData(prevState => ({...prevState, [target.name]: target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const newUser = await dispatch(register(data))
        if (newUser?.response?.status === 400) {
            return
        }
        history.push(`/${newUser.nickname}`)
    }

    return (
        <form onSubmit={handleSubmit} className="d-flex justify-content-left flex-column align-items-center">
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
            <TextField
                onChange={handleChange}
                name="nickname"
                value={data.nickname}
                label="Никнейм"
                error={error.nickname}
            />
            <button type="submit" className="btn btn-primary mt-3">Зарегистрироваться</button>
        </form>
    );
};

export default RegisterForm;
