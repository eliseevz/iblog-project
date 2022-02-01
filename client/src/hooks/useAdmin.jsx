import React, {useContext} from "react"


const AdminContext = React.createContext()

export const useAdmin = () => {
    return useContext(AdminContext)
}

export const AdminProvider = ({children}) => {
    return (
        <AdminContext.Provider>
            {children}
        </AdminContext.Provider>
    )

}