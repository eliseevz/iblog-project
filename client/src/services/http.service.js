import axios from "axios"
import configFile from "../config.json"
import {toast} from "react-toastify";
import {getAccesToken, getRefreshToken, getTokenExpiresDate, setTokens} from "./localStorage.service";
import authService from "./auth.service";

axios.defaults.baseURL = configFile.apiEndPoint

axios.interceptors.request.use(
    async function (config) {
        const refreshToken = getRefreshToken()
        const expiresDate = getTokenExpiresDate()
        const isExpired = refreshToken && expiresDate < Date.now()

        if (isExpired) {
            const data = await authService.refresh()
            setTokens(data)
        }
        const accessToken = getAccesToken()
        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`
            }
        }


        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    function (res) {
        res.data = {content: res.data}
        return res
    },
    function (err) {
        toast.error("Что то пошло не так.. :(")
        return Promise.reject(err)
    }
)

// const transformData = (data) => {
//     const transformedData =  data ? Object.keys(data).map(key => ({
//         ...data[key]
//     }))
//     : []
//     return transformedData
// }

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch
}

export default httpService
