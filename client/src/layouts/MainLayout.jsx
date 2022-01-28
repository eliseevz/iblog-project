import React from 'react';
import {useTheme} from "../hooks/useTheme";

const MainLayout = ({children}) => {

    const {mode} = useTheme()
    return (
        <div className="mainContent pb-5" style={mode === "day" ? {background: "rgb(225 225 225)", color: "#000"} : {background: "#242D35", color: "#fff"}}>
            {children}
        </div>
    );
};

export default MainLayout;
