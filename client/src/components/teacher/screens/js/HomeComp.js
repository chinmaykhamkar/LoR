import { React, useState, useEffect } from 'react'
import Link from '@material-ui/core/Link';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../css/HomeComp.css'
import UniList from './uniList';


let list = [];
const HomeComp = () => {
    var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('authTokent')}` }
    };
    var temail = localStorage.getItem('email');
    const [loading, setLoading] = useState(true);
    // const [list, setList] = useState([{}]);

    useEffect(() => {
        teacherData();
    }, [])

    const teacherData = async () => {
        try {
            const allData = await axios.get(`http://localhost:5000/teacher/profile/${temail}`, config);
            console.log(allData.data.data);
            // setList(allData.data.data[0].students);
            setTimeout(() => {
                list = [];
                for (let i = 0; i < allData.data.data[0].students.length; i++) {
                    list.push(allData.data.data[0].students[i]);
                }
                console.log(list);
                setLoading(false);
            }, 2500);


        } catch (err) {
            console.log(err);
            NotificationManager.success('Please Logout and Login again', 'Error', 5000);
        }
    }


    const studentList = list.map((d) => {
        var uniData = [];
        // var uniStatus = [];
        console.log(d.university.length)
        for (let i = 0; i < d.university.length; i++) {

            var obj = {
                "shortForm": d.university[i].shortForm,
                "status": d.university[i].status
            }
            uniData.push(obj);
        }
        // console.log(uniData);
        if (d.status) {

            return (
                <div className="tableContent">
                    <div className="tableHead">
                        {d.name}
                    </div>
                    <UniList count={uniData} />
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
        <div className="mainHome">
            <div className="homeTitle">
                Welcome to LoR Manager. Read the <Link href='/teacher/instruction' style={{ color: '#31A34A', marginLeft: 5, marginRight: 5 }}> Instructions </Link> before starting.
            </div>
            <br></br>
            <div className="homeGuide">
                <div className="homeDone">

                </div>
                <div>Done</div>
                <div className="homePending">

                </div>
                <div>Pending</div>
            </div>
            <br></br>
            <div className="homeTable">
                {studentList}
            </div>


        </div>
    )
}

export default HomeComp
