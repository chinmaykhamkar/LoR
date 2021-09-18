import { React, useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import '../css/StudentUniListScreen.css'
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';


var config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('authTokent')}` }
};

var name = localStorage.getItem('tname');
var temail = localStorage.getItem('email');
var urlString = window.location.href;
var url = new URL(urlString);
var semail = url.searchParams.get("semail");
// var lor;
const StudentUniComp = () => {

    const [copied, setCopied] = useState("");
    const [loading, setLoading] = useState(true);
    const [uniData, setUniData] = useState([{}])
    const [lor, setLor] = useState("");

    useEffect(() => {
        getStudentsUni();
    }, [uniData.name])


    const getStudentsUni = async () => {
        try {
            // console.log(semail)
            const studentUniData = await axios.get(`http://localhost:5000/teacher/student/uniList/${temail}/${semail}`, config);
            // console.log(studentUniData.data.lorLink);
            // setLor(studentUniData.data.lorLink);
            setLoading(false);
            setUniData(studentUniData.data.data.university);
            try{
                const studentLor = await axios.get(`http://localhost:5000/teacher/student/lorLink/${semail}`,config);
                // console.log(studentLor.data.data);
                setLor(studentLor.data.data);
            }catch(err){
                console.log(err);
            }
           

        } catch (err) {
            console.log('error ' + err);
            NotificationManager.success('Please Logout and Login again', 'Error', 5000);
        }
    }


    const updateHandler = async (id) => {
        try {
            const updateUni = await axios.post(
                `http://localhost:5000/teacher/uniListUpdate/${temail}`,
                { semail, id },
                config
            );
            // console.log(updateUni.data.data);
            getStudentsUni();
        } catch (err) {
            console.log('error ' + err);
        }
    }



    const uniList = uniData.map((d) => {
        const date = new Date(`${d.deadline}`);
        // console.log(date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const finalDeadline = day + "/" + month + "/" + year;
        const bg = (d.status ? '#8BE78B' : '#FFFDAF')

        return (
            <div key={d._id} style={{ backgroundColor: `${bg}` }} className="uniCard">
                <div style={{ display: 'flex' }}>
                    <div className="uniName">
                        {d.name}

                    </div>
                    <div className="uniDeadline">
                        {finalDeadline}

                    </div>
                </div>

                <div className="uniSave">
                    <Button onClick={() => updateHandler(d._id)} variant="contained" type="submit" color="primary">
                        Done
                    </Button>
                </div>
            </div>
        )
    })



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
            <div className="uniTitle">
                University List
            </div>
            <br></br>
            <div className="uniLor">
                <Button variant="contained" color="primary" onClick={() => {
                    navigator.clipboard.writeText(`${lor}`);
                    setCopied('Copied');
                    setTimeout(() => {
                        setCopied('');
                    }, 2000);
                }}>Copy LoR Link</Button>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 5, fontSize: 'small', fontWeight: 400 }}>{copied}</div>
            </div>
            <br></br>
            <div className="uniGuide">
                <div className="done">

                </div>
                <div>Done</div>
                <div className="pending">

                </div>
                <div>Pending</div>
            </div>
            {uniList}
        </div>
    )
}

export default StudentUniComp
