import React from 'react'
import {Redirect, Route} from 'react-router-dom';
const UniversityRoute = ({component:Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => 
                localStorage.getItem("authToken")?(
                    <Component {...props} />
                ):(
                    <Redirect to="/student/login" />
                )
            }
        />
    )
}

export default UniversityRoute;
