import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {getAuthData} from "../store/users";

const ProtectedRoute = ({component: Component, children, ...rest}) => {
    const loginStatus = useSelector(getAuthData())
    return (
        <Route {...rest} render={(props) => {
            if (!loginStatus) {
                return <Redirect to={{
                    pathname: "/",
                    state: props.location
                }} />
            }
            return Component ? <Component {...props} /> : children
        }}/>
    );
};

export default ProtectedRoute;
