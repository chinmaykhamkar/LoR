import { React, useState, useEffect } from 'react'
import '../css/TeacherComp.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { faVenusMars } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import swal from 'sweetalert';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/Notification'

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
    const [teacher, setTeacher] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const name = localStorage.getItem('sname');
    const semail = localStorage.getItem('email');
    useEffect(() => {
        getTeacherData();
    }, [teacher.name]);


    const getTeacherData = async () => {
        try {
            const teacherData = await axios.get(`https://lor-manager.herokuapp.com/student/getTeacherList/${semail}`, config);
            console.log(teacherData.data.data);
            setTeacher(teacherData.data.data);
            setLoading(false);

        } catch (err) {
            console.log('error ' + err);
            NotificationManager.success('Please Logout and Login again','Error',5000);

        }
    }

    const handleAddTeacher = async (e) => {
        e.preventDefault();
        console.log('clicked');
        if(!email){
            alert('Enter Email ID');
            return;
        }
        try {
            const addTeacher = await axios.post('https://lor-manager.herokuapp.com/student/addTeacher',
                { semail, email, name },
                config
            );
            console.log(addTeacher.data.data);
            getTeacherData();           

        } catch (error) {
            console.log(error);
            swal("Oops","Couldn't find teacher!" , "error");

        }
        setEmail('');
    }

    const requestTeacher = teacher.map((d) => {
        if (!d.status) {

            return (
                <div key={d._id} className="reqTeacher">
                    {d.name}
                </div>
            )
        }
    })
    const acceptTeacher = teacher.map((d) => {
        if (d.status) {

            return (
                <div key={d._id} className="accTeacher">
                    {d.name}
                </div>
            )
        }
    })



    if (loading) {
        return (
            <div className='profileMain'>
                <CircularProgress />
                <NotificationContainer/>                

            </div>
        )
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
                            required
                            autoComplete="email"
                            autoFocus
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

                        {requestTeacher}

                    </div>
                </div>
                <div className="accBotton">
                    <div className="topTitle">Request Accepted</div>
                    <div className="accList">
                        {acceptTeacher}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherComp
