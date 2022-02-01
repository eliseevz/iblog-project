import React, {useState} from 'react';
import {useTheme} from "../../hooks/useTheme";

const Switcher = () => {

    const {mode, setMode} = useTheme()
    const [state, setState] = useState(false)

    const handleClick = (e) => {
        setState(prevState => !prevState)
        if (mode === "day") {
            setMode("night")
        } else {
            setMode("day")
        }
    }

    return (
        <div className={`form-check form-switch`}>

            <input className={`form-check-input `} onChange={handleClick} checked={state} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
            <label className={`form-check-label fs-7`} htmlFor="flexSwitchCheckDefault">
                {
                    state
                        ? <i className="bi bi-brightness-high-fill"></i>
                        : <i className="bi bi-moon-stars-fill"></i>
                }
            </label>
        </div>
    );
};

export default Switcher;
