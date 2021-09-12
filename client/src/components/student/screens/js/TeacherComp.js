import { React, useState, useEffect } from 'react'
import '../css/TeacherComp.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { faVenusMars } from '@fortawesome/free-solid-svg-icons';
var config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
};
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50ch',
        },
    },
}));
var config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
};
const TeacherComp = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const name = localStorage.getItem('sname');
    const semail = localStorage.getItem('email');
    const handleAddTeacher = async (e) => {
        e.preventDefault();
        console.log('clicked');        
        try {
            const addTeacher = await axios.post('http://localhost:5000/student/addTeacher',
                { semail, email, name },
                config
            );
            console.log(addTeacher.data.data);
            try{
                const teacherData = await axios.get(`http://localhost:5000/student/getTeacherList/${semail}`, config);
                console.log(teacherData);
            }catch(err){
                console.log(err);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mainDivTeach">
            <div className="mainTop">
                <div className="topTitle">
                    Enter Email of your Teacher
                </div>
                <div className="topField">
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            id="outlined-basic"
                            label="Enter Email"
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </form>
                </div>
                <div className="topBtn">
                    <Button onClick={handleAddTeacher} variant="contained" color="primary">
                        Add Teacher
                    </Button>
                </div>
            </div>
            <div className="mainBottom">
                <div className="requestBottom">
                    <div className="topTitle">Request Pending</div>
                    <div className="reqList">
                        <div className="reqTeacher">
                            Teacher 1
                        </div>
                        <div className="reqTeacher">
                            Teacher 2
                        </div>
                    </div>
                </div>
                <div className="accBotton">
                    <div className="topTitle">Request Accepted</div>
                    <div className="accList">
                        <div className="accTeacher">
                            Teacher 1
                        </div>
                        <div className="accTeacher">
                            Teacher 2
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherComp
