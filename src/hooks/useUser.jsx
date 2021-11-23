import React, {useContext, useEffect, useState} from "react"
import userAPI from "../api/users"
import usersService from "../services/users.service";

const UserContext = React.createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => {

    const {addNewArticle} = userAPI
    const [user, setUser] = useState()
    const [users, setUsers] = useState()
    const [isLoading, setLoading] = useState(true)

    useEffect( () => {
        console.log("запрос всех юзеров")
        fetchAllUsers()
        setLoading(false)
    }, [])

    useEffect(() => {
        const userInStorage = localStorage.getItem("user")
        console.log(userInStorage, ' userOnStorage')
        if (userInStorage && users) {
            const id = JSON.parse(userInStorage)
            const result = getUserById(id)
            setUser(result)
        }
    }, [users])

    const fetchAllUsers = async () => {
        const data = await usersService.fetchAll()
        setUsers(data.content)
    }

    const getUserById = (id) => {
        const user = users.find(user => user._id === id)
        return user
    }

    const getUserByNickname = (nickname) => {
        let resData = null
        if (users) {
            resData = users.find(user => user.nickname === nickname)
        }
        return resData
    }

    const login = async (data) => {
        const findUser = users.find(user => user.email === data.email && user.password === data.password)
        if (findUser) {
            const result = getUserById(findUser._id)
            localStorage.setItem("user", JSON.stringify(findUser._id))
            setUser(result)
        }
        setLoading(false)
        return findUser
    }

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
    }

    const addArticle = async (id, articleId) => {
        console.log(id, 'problem id')
        const data = {
            ...user,
            articles: user.articles ? [...user.articles, articleId] : [articleId]
        }
        const result = await usersService.update(id, data)
        console.log(result, " result of add article in user")
    }

    const removeArticle = async (id, articleId) => {
        const data = {
            ...user,
            articles: user.articles.filter(art => art !== articleId)
        }
        // const data = {
        //     ...user,
        //     articles: [...user.articles, articleId]
        // }
        const result = await usersService.update(id, data)
        console.log(result, " result of remove article in user")
    }

    const addFavorite = async (id) => {
        const newUser = {
            ...user,
            favorites: user.favorites ? [...user.favorites, id] : [id]
        }
        const result = await usersService.update(user._id, newUser)
        setUser(result)
    }

    const removeFavorite = async (id) => {
        const newUser = {
            ...user,
            favorites: user.favorites.filter(fav => fav !== id)
        }
        const result = await usersService.update(user._id, newUser)
        setUser(result)
    }

    return (
        <UserContext.Provider value={{user, users, login, logout, addArticle, getUserByNickname, getUserById, removeArticle, addFavorite, removeFavorite}}>
            {
                !isLoading
                ? children
                : <p>loading.........</p>
            }
        </UserContext.Provider>
    )

}