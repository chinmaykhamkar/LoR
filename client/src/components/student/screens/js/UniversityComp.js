import { React, useState, useEffect } from 'react'
import '../css/UniversityComp.css'
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
import 'react-notifications/lib/Notification'


var config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
};
var email = localStorage.getItem('email');

const UniversityComp = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [dead, setDead] = useState('');
    const [shortForm, setShort] = useState('');
    const [university, setUniversity] = useState([{}]);
    const [size,setSize] = useState(0);
    useEffect(() => {
        getUni();
    }, [university.name])

    const getUni = async () => {
        try {
            var count = 0;
            const uniData = await axios.get(`https://lor-manager.herokuapp.com/student/university/${email}`, config);
            console.log(uniData.data.data);
            setUniversity(uniData.data.data);
            for(let i=0;i<uniData.data.data.length;i++){
                count = count + 1;
                setSize(count);
            }
            setLoading(false);
            console.log(size)
            
        } catch (err) {
            console.log(err);
            NotificationManager.success('Please Logout and Login again', 'Error', 5000);
            
        }
        
    }
    const addUniversity = async (e) => {
        e.preventDefault();
        if(!name || !dead || !shortForm){
            alert('Enter all the values')
        }
        
        // console.log(name,dead,shortForm)
        
        try{
            const date = new Date(`${dead}`);
            const deadline = date.toISOString();
            const short = shortForm.toUpperCase();
            const addUni = await axios.post(
                `https://lor-manager.herokuapp.com/student/addUniversity/${email}`,
                {name,deadline,short},
                config
            );
            console.log(addUni.data.data);
            setOpen(false);
            setSize(size-2);
            getUni();
        }catch(err){
            console.log(err);
        }
       
    }

    const loadUni = university.map((d) => {
        const date = new Date(`${d.deadline}`);
        // console.log(date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();        
       
        const finalDeadline = day + "/" + month + "/" + year;
        // console.log(finalDeadline)
        
        return (
            <div key={d._id} className="uniContent">
                <div className="uniNames">
                    {d.name}
                </div>
                <div className="uniDeadlines">
                    {finalDeadline}
                </div>
            </div>
        )
    });



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setName('');
        setDead('');
        setShort('');
        setOpen(false);
    }
    const EmptyList = () => {
        return (
            <div className="noRequest">
                No Universities added
            </div>
        )
    }
    if (loading) {
        return (
            <div className='profileMain'>
                <CircularProgress />
                <NotificationContainer />
            </div>
        )
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
                { size > 0 ? loadUni : <EmptyList />}                

            </div>
            <div className="uniAdd">
                <div>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>
                        Add University
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                        <DialogContent style={{ width: '20rem' }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="University name"
                                type="text"
                                fullWidth
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField

                                margin="dense"
                                id="abr"
                                label="abbrivation (max length 4)"
                                type="text"
                                inputProps={{ maxLength: 4 }}
                                fullWidth
                                required
                                value={shortForm}
                                onChange={(e) => setShort(e.target.value)}
                            />
                            <TextField

                                margin="dense"
                                id="deadline"
                                // label="Deadline"
                                placeholder="Deadline"
                                type="date"
                                fullWidth
                                required
                                value={dead}
                                onChange={(e) => setDead(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" type="submit" onClick={handleClose} color="secondary">
                                Close
                            </Button>
                            <Button variant="contained" type="submit" onClick={addUniversity} color="primary">
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
