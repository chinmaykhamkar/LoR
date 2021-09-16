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
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/Notification'
import '../css/StudentProfile.css';
import swal from 'sweetalert';
var storeData;
var config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
};
const ProfileComp = () => {
    // const [data, setData] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [college, setCollege] = useState("");
    const [lor, setLor] = useState("");
    const [copied, setCopied] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();

    }, []);

    const getData = async () => {        

        try {
            const allData = await axios.get(`http://localhost:5000/student/profile/${email}`, config);
            storeData = allData.data.data;
            // setData(storeData);
            setUsername(storeData[0].username);
            setCollege(storeData[0].collegeName);
            setLor(storeData[0].lorLink);
            console.log(storeData);
            setLoading(false);

        } catch (err) {
            console.log(err);
            NotificationManager.success('Please Logout and Login again','Error',5000);
        }     

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSave = async(e) => {
        e.preventDefault();

        try{
            const updateData = await axios.post(
                `http://localhost:5000/student/updateProfile/${email}`,
                {username,college,lor},
                config
            );
            storeData = updateData.data.data;
            console.log(storeData);
            setOpen(false);
            NotificationManager.success('Profile updated','',2000);

        } catch(error){
            console.log(error);
        }
    };

    const handleClose = () => {
        setUsername(storeData[0].username);
        setCollege(storeData[0].collegeName);
        setLor(storeData[0].lorLink);
        setOpen(false);
        // NotificationManager.success('Error','Please try again',2000);

    };


    if (loading) {
        return (
            <div className='profileMains'>
                <CircularProgress />
                <NotificationContainer/>                
            </div>
        )
    }

    return (
        <div className='profileMains'>
            <NotificationContainer/>
            <div className='profileCards'>
                <div className='profileDivs'>
                    <div className='profileTitles'>
                        <div className='profileKeys'>User Name</div>
                        <div className='profileVals'>{username}</div>
                    </div>
                    <div className='profileTitles'>
                        <div className='profileKeys'>Email</div>
                        <div className='profileVals'>{email}</div>
                    </div>
                    <div className='profileTitles'>
                        <div className='profileKeys'>College Name</div>{
                            college ? (
                                <div className='profileVals'>{college}</div>
                            ) : <div className='profileVals'>None</div>
                        }
                    </div>
                    <div className='profileTitles'>
                        <div className='profileKeys'>LoR link</div>
                        <div className='profileVals'>
                            <Button variant="contained" color="primary" onClick={() => {
                                navigator.clipboard.writeText(`${lor}`);
                                setCopied('Copied');
                                setTimeout(() => {
                                    setCopied('');
                                }, 2000);
                            }}>copy to clipboard</Button>
                           <div style={{display:'flex',alignItems:'center',marginLeft:5,fontSize:'small',fontWeight:400}}>{copied}</div> 
                        </div>
                    </div>
                </div>
            </div>
            <div className='profileEdits'>
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
                            <TextField
                                autoFocus
                                margin="dense"
                                id="lor"
                                label="Lor Link"
                                type="text"
                                fullWidth
                                value={lor}
                                onChange={(e) => setLor(e.target.value)}
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
