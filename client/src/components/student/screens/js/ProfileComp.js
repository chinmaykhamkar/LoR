import { React, useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../css/ProfileComp.css'
const ProfileComp = () => {
    const [info, getInfo] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [university, setUniversity] = useState("");
    const [lor, setLor] = useState("");
    const [copied, setCopied] = useState("");
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    return (
        <div className='profileMain'>
            <div className='profileCard'>
                <div className='profileDiv'>
                    <div className='profileTitle'>
                        <div className='profileKey'>User Name</div>
                        <div className='profileVal'>Chinmay Khamkar</div>
                    </div>
                    <div className='profileTitle'>
                        <div className='profileKey'>Email</div>
                        <div className='profileVal'>khamkarchinmay4@gmail.com</div>
                    </div>
                    <div className='profileTitle'>
                        <div className='profileKey'>College Name</div>
                        <div className='profileVal'>DJ Sanghvi</div>
                    </div>
                    <div className='profileTitle'>
                        <div className='profileKey'>LoR link</div>
                        <div className='profileVal'>
                            <Button style={{ backgroundColor: 'white' }} variant="outlined" color="primary" onClick={() => {
                                navigator.clipboard.writeText('lor link');
                                setCopied('Copied');
                                setTimeout(() => {
                                    setCopied('');
                                }, 2000);
                            }}>copy to clipboard</Button>
                            {copied}
                        </div>
                    </div>
                </div>
            </div>
            <div className='profileEdit'>
                <div>
                    <Button style={{backgroundColor:'white'}} variant="outlined" color="primary" onClick={handleClickOpen}>
                        Edit
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                .
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="User Name"
                                type="text"
                                fullWidth
                            />
                            <br />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                            />
                            <br />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="University"
                                type="text"
                                fullWidth
                            />
                            <br />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Lor Link"
                                type="text"
                                fullWidth
                            />
                            <br />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                Subscribe
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default ProfileComp
