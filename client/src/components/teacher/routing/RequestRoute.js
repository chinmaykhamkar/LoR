import React from 'react'
import {Redirect, Route} from 'react-router-dom';
const RequestRoutet = ({component:Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => 
                localStorage.getItem("authToken")?(
                    <Component {...props} />
                ):(
                    <Redirect to="/teacher/login" />
                )
            }
        />
    )
}

export default RequestRoutet;
