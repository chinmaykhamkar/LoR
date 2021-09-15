import { React, useState, useEffect } from 'react'
import '../css/UniversityComp.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
var config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
};
var email = localStorage.getItem('email');
const UniversityComp = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [name,setName] = useState('');
    const [deadline,setDeadline] = useState('');
    const [short,setShort] = useState('');


    const getUni = async () => {
        try{

        }catch(err){
            console.log(err);
        }
    }



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div className="uniMain">
            <div className="uniTable">
                <div className="uniHead">
                    <div className="uniNameT">
                        University Name
                    </div>
                    <div className="uniDeadlineT">
                        Deadline
                    </div>
                </div>
                <div className="uniContent">
                    <div className="uniNames">
                        Arizona state university
                    </div>
                    <div className="uniDeadlines">
                        15/12/2021
                    </div>
                </div>
                <div className="uniContent">
                    <div className="uniNames">
                        Arizona state university
                    </div>
                    <div className="uniDeadlines">
                        15/12/2021
                    </div>
                </div>

                <div className="uniContent">
                    <div className="uniNames">
                        Arizona state university
                    </div>
                    <div className="uniDeadlines">
                        15/12/2021
                    </div>
                </div>
            </div>
            <div className="uniAdd">
                <div>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>
                        Open form dialog
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                        <DialogContent style={{width:'20rem'}}>                            
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="University name"
                                type="text"
                                fullWidth
                                required
                            />
                            <TextField
                                
                                margin="dense"
                                id="abr"
                                label="abbrivation (max length 4)"
                                type="text"
                                inputProps={{maxLength:4}}
                                fullWidth
                                required
                            />
                            <TextField
                                
                                margin="dense"
                                id="deadline"
                                // label="Deadline"
                                placeholder="Deadline"
                                type="date"                                
                                fullWidth
                                required
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button type="submit" onClick={handleClose} color="secondary">
                                Close
                            </Button>
                            <Button type="submit" onClick={handleClose} color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default UniversityComp
