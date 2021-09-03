import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import './publicNav.css'
const PublicNav = () => {
    return (
        <React.Fragment>

            <div className="logo">
                    <FontAwesomeIcon icon={faUniversity} size={"2x"}/>
                </div>
                <div className="name">
                    LoR Manager
                </div>
        </React.Fragment>
    
    )
}

export default PublicNav
