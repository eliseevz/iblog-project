import axios from "axios"
import configFile from "../config.json"
import {toast} from "react-toastify";

axios.defaults.baseURL = configFile.apiEndPoint

axios.interceptors.request.use(
    function (config) {
        const containSlash = /\/&/gi.test(config.url)
        config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json"
        console.log(config.url)
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    function (res) {
        res.data = {content: transformData(res.data)}
        return res
    },
    function (err) {
        toast.error("Что то пошло не так.. :(")
        return Promise.reject(err)
    }
)

const transformData = (data) => {
    const transformedData =  data ? Object.keys(data).map(key => ({
        ...data[key]
    }))
    : []
    return transformedData
}

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

export default httpService
