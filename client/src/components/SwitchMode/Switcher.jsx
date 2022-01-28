import React from 'react';
import classes from "./switcher.module.css"
import {useTheme} from "../../hooks/useTheme";

const Switcher = () => {

    const {mode, setMode} = useTheme()

    const handleClick = (e) => {
        if (mode === "day") {
            setMode("night")
        } else {
            setMode("day")
        }
    }

    return (
        <div className={`form-check form-switch`}>
            <input className={`form-check-input `} onClick={handleClick} checked={mode === "night"} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                <label className={`form-check-label fs-7`} htmlFor="flexSwitchCheckDefault">
                    Switch mode
                </label>
        </div>
    );
};

export default Switcher;
