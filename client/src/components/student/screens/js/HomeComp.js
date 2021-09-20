import { React, useState, useEffect } from 'react'
import Link from '@material-ui/core/Link';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../css/HomeComp.css'
import UniHomeList from './uniHomeList'

let teacherList = [];
let uniList = [];
let counter = 0;
const HomeComp = () => {
    var teachers = [];
    var axiosData = [];
    var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    };
    var semail = localStorage.getItem('email');
    const [loading, setLoading] = useState(true);
    // const [counter, setCounter] = useState(0)

    useEffect(() => {
        studentData();
    }, [])


    const studentData = async () => {
        try {
            const sdata = await axios.get(`http://localhost:5000/student/profile/${semail}`, config);
            // console.log(sdata.data.data);
            setTimeout(() => {
                for (let i = 0; i < sdata.data.data[0].teachers.length; i++) {
                    teachers.push('http://localhost:5000/student/homeData/' + semail + '/' + sdata.data.data[0].teachers[i].temail);
                    teacherList.push(sdata.data.data[0].teachers[i]);
                }
                // console.log(teacherList);
                for (let i = 0; i < teachers.length; i++) {
                    axiosData.push(axios.get(teachers[i], config));
                }
                // console.log(axiosData);
                axios.all(axiosData)
                    .then(
                        axios.spread((...responses) => {
                            for (let i = 0; i < responses.length; i++) {
                                // console.log(responses[i].data.data.university);
                                uniList.push(responses[i].data.data.university);
                            }
                            console.log(uniList);
                            setLoading(false);
                        })
                    )
                    .catch(err => console.log(err));

            }, 3000);




        } catch (err) {
            console.log(err);
            NotificationManager.success('Please Logout and Login again', 'Error', 5000);
        }
    }



    const homeList = teacherList.map((d) => {
        var universityData = [];
        // console.log(uniList[counter])
        for(let k=0;k<uniList[counter].length;k++){
            var uniobj = {
                "shortForm":uniList[counter][k].shortForm,
                "status":uniList[counter][k].status
            }
            universityData.push(uniobj);
        }
        counter = counter + 1;
        // console.log(universityData);
        if (d.status) {
            return (
                <div className="tableContent">
                    <div className="tableHead">
                        {d.name}
                    </div>
                    <UniHomeList count={universityData} />

                    {/* <div style={{ backgroundColor: '#8BE78B' }} className="tableItem">
                        ASU
                    </div>
                    <div className="tableItem">
                        psu
                    </div>
                    <div style={{ backgroundColor: '#8BE78B' }} className="tableItem">
                        neu
                    </div> */}

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
                Welcome to LoR Manager. Read the <Link href='/student/instruction' style={{ color: '#DA2426', marginLeft: 5, marginRight: 5 }}> Instructions </Link> before starting.
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
                {!loading && homeList}

                {/* <div className="tableContent">
                    <div className="tableHead">
                        kiran bhowmick
                    </div>
                    <div style={{ backgroundColor: '#8BE78B' }} className="tableItem">
                        ASU
                    </div>
                    <div className="tableItem">
                        psu
                    </div>
                    <div style={{ backgroundColor: '#8BE78B' }} className="tableItem">
                        neu
                    </div>

                </div> */}

            </div>


        </div>
    )
}

export default HomeComp
