import React from 'react';
import './mainScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';


const mainScreen = () => {
    return (
        <React.Fragment>
           <div className="main">               
            <div className="navbar">
                <div className="logo">
                    <FontAwesomeIcon icon={faUniversity} size={"2x"}/>
                </div>
                <div className="name">
                    LoR Manager
                </div>
            </div>

            <div className="mainDiv">
                <div className="mainText">
                    Select user type:
                </div>
                <div className="cardArea">
                    <div className="card">
                        
                    </div>
                    <div className="card">
                        
                    </div>
                </div>
            </div>
            </div> 



        </React.Fragment>
            
    )
}

export default mainScreen
