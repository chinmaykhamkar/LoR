import React from 'react'
import '../css/TeacherComp.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50ch',
        },
    },
}));
const TeacherComp = () => {
    const classes = useStyles();
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

                        />
                    </form>
                </div>
                <div className="topBtn">
                    <Button variant="contained" color="primary">
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
