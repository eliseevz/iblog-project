import React, {useContext, useState} from "react"

const ThemeContex = React.createContext()

export function useTheme() {
    return useContext(ThemeContex)
}

export const ThemeProvider = ({children}) => {
    const [mode, setMode] = useState("night")

    return <ThemeContex.Provider value={{mode, setMode}}>
        {children}
    </ThemeContex.Provider>

}