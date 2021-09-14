import { React, useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import '../css/ProfileComp.css'
import 'react-notifications/lib/Notification'
import swal from 'sweetalert';

var storeData;
var config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('authTokent')}` }
};
const ProfileComp = () => {
    // const [data, setData] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [college, setCollege] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();

    }, []);

    const getData = async () => {

        try {
            const allData = await axios.get(`http://localhost:5000/teacher/profile/${email}`, config);
            storeData = allData.data.data;
            // setData(storeData);
            setUsername(storeData[0].username);
            setCollege(storeData[0].collegeName);
            console.log(storeData);
            setLoading(false);

        } catch (err) {
            console.log(err);
        }

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const updateData = await axios.post(
                `http://localhost:5000/teacher/updateProfile/${email}`,
                { username, college },
                config
            );
            storeData = updateData.data.data;
            console.log(storeData);
            setOpen(false);
            NotificationManager.success('Profile updated', '', 2000);

        } catch (error) {
            console.log(error);
            NotificationManager.success('Error', 'Please try again', 2000);
        }
    };

    const handleClose = () => {
        setUsername(storeData[0].username);
        setCollege(storeData[0].collegeName);
        setOpen(false);

    };


    if (loading) {
        return (
            <div className='profileMain'>
                <CircularProgress />
                
            </div>
        )
    }

    return (
        <div className='profileMain'>
            <NotificationContainer />
            <div className='profileCard'>
                <div className='profileDiv'>
                    <div className='profileTitle'>
                        <div className='profileKey'>User Name</div>
                        <div className='profileVal'>{username}</div>
                    </div>
                    <div className='profileTitle'>
                        <div className='profileKey'>Email</div>
                        <div className='profileVal'>{email}</div>
                    </div>
                    <div className='profileTitle'>
                        <div className='profileKey'>College Name</div>{
                            college ? (
                                <div className='profileVal'>{college}</div>
                            ) : <div className='profileVal'>None</div>
                        }
                    </div>
                </div>
            </div>
            <div className='profileEdit'>
                <div>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>
                        Edit
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                        <DialogContent style={{ width: '30rem' }}>


                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="User Name"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                            />
                            <br />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="college"
                                label="College"
                                type="text"
                                fullWidth
                                value={college}
                                onChange={(e) => setCollege(e.target.value)}
                            />
                            <br />
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" type="submit" onClick={handleClose} color="secondary">
                                Close
                            </Button>
                            <Button variant="contained" type="submit" onClick={handleSave} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default ProfileComp
