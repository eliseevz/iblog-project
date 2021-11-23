import React, {useContext, useEffect, useState} from "react"
import adminAPI from "../api/admin"


const AdminContext = React.createContext()

export const useAdmin = () => {
    return useContext(AdminContext)
}

export const AdminProvider = ({children}) => {

    const [admin, setAdmin] = useState(false)
    const {admin:adminInfo} = adminAPI


    useEffect(() => {
        const userInStorage = localStorage.getItem("admin")
        if (userInStorage) {
            setAdmin(true)
        }
    }, [])

    const login = async (data) => {
        if (data.login === adminInfo.login && data.password === adminInfo.password) {
            localStorage.setItem("admin", JSON.stringify(true))
            setAdmin(true)
        }
    }

    const logout = () => {
        localStorage.removeItem("admin")
        setAdmin(false)
    }

    return (
        <AdminContext.Provider value={{admin, login, logout}}>
            {children}
        </AdminContext.Provider>
    )

}