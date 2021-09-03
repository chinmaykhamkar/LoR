import React from 'react';
import './mainScreen.css';
import MainCard from './common/mainCard';
import PublicNav from './common/publicNav';
const MainScreen = () => {

    localStorage.setItem('studentColor','#DA2426');
    localStorage.setItem('teacherColor','#31A34A');
    var scolor = localStorage.getItem('studentColor');
    var tcolor = localStorage.getItem('teacherColor');

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
                        <MainCard link="/student/login" type="Student" color={scolor}/>
                                                
                    </div>
                    <div className="card">
                        <MainCard link="/teacher/login" type="Teacher" color={tcolor} />
                                           
                    </div>
                </div>
            </div>
            </div> 
            


        </React.Fragment>
            
    )
}

export default MainScreen
