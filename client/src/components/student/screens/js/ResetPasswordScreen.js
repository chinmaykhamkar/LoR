import { React, useState, useEffect } from 'react'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PublicNav from '../../../common/publicNav';
import swal from 'sweetalert';
import '../../../common/common.css'
var color = localStorage.getItem('studentColor');
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: color,
    },
}));
const ResetPasswordScreen = ({ history, match }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            history.push("/student/home");
        }
    }, [history]);

    const resetPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            setError("Passwords don't match");
            return showError(error);
        }

        try {
            const { data } = await axios.put(
                `http://localhost:5000/student/auth/passwordreset/${match.params.resetToken}`,
                {
                    password,
                },
                config
            );

            console.log(data);
            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    const showError = (e) => {
        swal("Oops", e, "error");
    }
    const showSuccess = (s) => {
        swal(s, "", "success")
            .then(() => {
                history.push("/student/login");
            })
    }

    const classes = useStyles();
    return (
        <div className="main">
            <div style={{ backgroundColor: color }} className="navbar">
                <PublicNav />
            </div>
            <div className="mainDiv">
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Reset Password
                        </Typography>
                        <form onSubmit={resetPasswordHandler} className={classes.form} noValidate>
                            {error && showError(error)}
                            {success && showSuccess(success)}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password (min length of 6) "
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                margin="normal"
                                name="password"
                                label="Confirm Password"
                                type="password"
                                id="confirmpassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Reset Password

                            </Button>
                        </form>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default ResetPasswordScreen;
