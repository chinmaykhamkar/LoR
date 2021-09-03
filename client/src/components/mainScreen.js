import React from 'react';
import './mainScreen.css';
import MainCard from './common/mainCard';
import PublicNav from './common/publicNav';
const MainScreen = () => {
    return (
        <React.Fragment>
           <div className="main">               
            <div className="navbar">
                <PublicNav />                
            </div>

            <div className="mainDiv">
                <div className="mainText">
                    Select user type:
                </div>
                <div className="cardArea">
                    <div className="card">
                        <MainCard link="/student/login" type="Student" />
                                                
                    </div>
                    <div className="card">
                        <MainCard link="/teacher/login" type="Teacher" />
                                           
                    </div>
                </div>
            </div>
            </div> 
            


        </React.Fragment>
            
    )
}

export default MainScreen
