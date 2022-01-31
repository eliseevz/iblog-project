import httpService from "./http.service";
import axios from "axios";
import localStorageService from "./localStorage.service";
const usersEndPoint = "user/"

const httpAuth = axios.create({
    baseURL: "http://localhost:8080/api/auth",
    // params: {
    //     key: "AIzaSyDrSWp9ASAL0TL0mBC2yTxeBUvAzaWhKpQ"
    // }
})

const authService = {
    login: async ({email, password}) => {
        const {data} = await httpAuth.post("signInWithPassword", {
            email,
            password,
            returnSecureToken: true
        })
        return data
    },
    register: async (payload) => {
        const {data} = await httpAuth.post("signUp", {
            ...payload,
            returnSecureToken: true
        })
        return data
    }
}

export default authService