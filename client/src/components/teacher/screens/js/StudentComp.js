import { React, useState, useEffect } from 'react'
import '../css/StudentComp.css'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Link from '@material-ui/core/Link';



var config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('authTokent')}` }
};
var temail = localStorage.getItem('email');
const StudentComp = () => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([{}]);

    useEffect(() => {
        getStudents();
    }, []);
    const getStudents = async () => {
        try {
            const studentData = await axios.get(`http://localhost:5000/teacher/students/${temail}`, config);
            console.log(studentData.data.data);
            setLoading(false);
            setStudents(studentData.data.data);
        } catch (err) {
            console.log('error ' + err);
            NotificationManager.success('Please Logout and Login again', 'Error', 5000);
        }
    }


    const studentList = students.map((d) => {
        if (d.status) {  
            var pending=0;         
           for(let i=0;i<d.university.length;i++){
               if(d.university[i].status == false){
                   pending=pending+1;
               }
           }
            // console.log(pending)
            var link = `/teacher/studentunilist?semail=${d.semail}`
            // console.log(link)
            return (
                <div key={d._id} className="studCard">
                    <Link href={link} style={{ color: 'black',textDecoration: 'none' }}>
                    <div className="studHead">
                        <div className='studKey'>Student Name</div>
                        <div className='studVal'>{d.name}</div>
                    </div>
                    <div className="studHead">
                        <div className='studKey'>Total Universities</div>
                        <div className='studVal'>{d.university.length}</div>
                    </div>
                    <div className="studHead">
                        <div className='studKey'>Pending LoRs</div>
                        <div className='studVal'>{pending}</div>
                    </div>
                    </Link>
                </div>
                
                
            )
        }
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
        <div className="studMain">
            <div className="studTitle">
                Student List
            </div>
            <div className="studContent">
                {studentList}
            </div>
        </div>
    )
}

export default StudentComp
