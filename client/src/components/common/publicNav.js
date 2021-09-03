import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './publicNav.css'
const PublicNav = () => {
    return (
        <React.Fragment>

            <div className="logo">
                <Link style={{color:'#fff'}} to='/'>
                <FontAwesomeIcon icon={faUniversity} size={"2x"} />
                </Link>
            </div>
            <div className="name">
                LoR Manager
            </div>
        </React.Fragment>

    )
}

export default PublicNav
