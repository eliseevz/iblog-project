import React, { useState} from 'react';
import RegisterForm from "../components/registerForm";
import LoginForm from "../components/loginForm";
import {useHistory} from "react-router-dom"

const AuthPage = (props) => {

    const history = useHistory()
    const {type} = props.match.params

    const [formType, setFormType] = useState(type === "register" ? type : "login")

    const handleChangeForm = () => {
        if (formType === "register") {
            setFormType("login")
            history.push("/auth")
        } else {
            setFormType("register")
            history.push("/auth/register")
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4 bg-dark">
                    {
                        formType === "register"
                        ? <>
                            <h2 className="mb-3">Регистрация</h2>
                            <RegisterForm/>
                            <p className="mt-4">У вас уже есть аккаунт? <span role="button"  onClick={handleChangeForm}><strong>Войти</strong></span></p>
                        </>
                        : <>
                            <h2>Авторизация</h2>
                            <LoginForm/>
                            <p className="mt-4">У вас нет аккаунта? <span role="button" onClick={handleChangeForm}><strong>Зарегистрироваться</strong></span></p>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
