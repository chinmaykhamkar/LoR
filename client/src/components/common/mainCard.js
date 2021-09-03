import React from 'react';
import './mainCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
const MainCard = (props) => {
    console.log(props.icon);
    return (
        <React.Fragment>
            <div style={{backgroundColor:props.color}} className="cardLogo">
                <FontAwesomeIcon icon={(props.type) == 'Student'? faUserGraduate:faChalkboardTeacher} size={"9x"} />
            </div>
            <div style={{backgroundColor:props.color}}   className="cardBtn">
                <Button style={{backgroundColor:"#F5F5F5",color:props.color,fontWeight:"bold"}} component={Link} to={props.link} variant="contained" color="primary" >{props.type}</Button>
            </div>
        </React.Fragment>
        
    )
}

export default MainCard
