import React from 'react'
import {Redirect, Route} from 'react-router-dom';
const InstructionRoutet = ({component:Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem("authTokent") ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/teacher/login" />
                )
            }
        />
    )
}

export default InstructionRoutet
