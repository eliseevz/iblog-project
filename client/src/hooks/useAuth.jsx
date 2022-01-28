import React, {useContext, useState} from "react"
import axios from "axios";
import {setTokens} from "../services/localStorage.service";
import httpService from "../services/http.service";
import usersService from "../services/users.service";
import {toast} from "react-toastify"

const AuthContext = React.createContext()
const httpAuth = axios.create()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

    const [currentUser, setUser] = useState({})
    const [errors, setErrors] = useState({})

    const signUp = async ({email, password, ...rest}) => {
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
        const apiKey = "AIzaSyDrSWp9ASAL0TL0mBC2yTxeBUvAzaWhKpQ"
        const result = await httpAuth.post(url + apiKey, {email, password, returnSecureToken: true})
        setTokens(result.data)
        create({
            email,
            ...rest,
            _id: result.data.localId
        })
    }

    const signIn = async ({email, password}) => {
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
        const apiKey = "AIzaSyDrSWp9ASAL0TL0mBC2yTxeBUvAzaWhKpQ"

        try {
            const result = await httpAuth.post(url + apiKey, {email, password, returnSecureToken: true})
            setTokens(result.data)
            toast.success("Успешная авторизация")
        } catch (e) {
            const {message, code} = e.response.data.error
            if (code === 400) {
                if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        password: "Неправильный пароль"
                    }
                    throw errorObject
                }
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Пользователь не найден"
                    }
                    throw errorObject
                }
            }
        }
    }

    const create = async (data) => {
        console.log(data, ' data in create')
        const res = await usersService.create(data)
        console.log(res, ' create res')
    }

    return <AuthContext.Provider value={{signUp, signIn}}>
        {children}
    </AuthContext.Provider>
}