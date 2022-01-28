import httpService from "./http.service";
import axios from "axios";
import localStorageService from "./localStorage.service";
const usersEndPoint = "user/"

const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: "AIzaSyDrSWp9ASAL0TL0mBC2yTxeBUvAzaWhKpQ"
    }
})

const authService = {
    login: async ({email, password}) => {
        const {data} = await httpAuth.post("accounts:signInWithPassword", {
            email,
            password,
            returnSecureToken: true
        })
        return data
    },
    register: async ({email, password}) => {
        const {data} = await httpAuth.post("accounts:signUp", {
            email,
            password,
            returnSecureToken: true
        })
        return data
    }
}

export default authService