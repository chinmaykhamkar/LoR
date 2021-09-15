import { React, useState, useEffect } from 'react'
import '../css/RequestComp.css'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import swal from 'sweetalert';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/Notification'

var config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('authTokent')}` }
};

var name = localStorage.getItem('tname');
var temail = localStorage.getItem('email');
// var size=0;  
const RequestComp = () => {

    const [request, setRequest] = useState([{}]);    
    const [loading, setLoading] = useState(true);
    const [size,setSize] = useState(0); 
    useEffect(() => {
        getData();
    }, [request.name]);
    
    const getData = async () => {
        try {
            var count = 0;
            const requestData = await axios.get(`http://localhost:5000/teacher/request/${temail}`, config);
            console.log(requestData.data.data);
            setRequest(requestData.data.data);
            for(let i=0;i<requestData.data.data.length;i++){
                if(requestData.data.data[i].status == false){
                    count = count + 1;
                    setSize(count);
                    // setSize(size+1);
                }
            }
            // size = requestData.data.data.length;
            setLoading(false);
            console.log(size);


        } catch (err) {
            console.log('error ' + err);
            NotificationManager.success('Please Logout and Login again','Error',5000);


        }

    }

    const acceptHandler = async (semail) => {
        try {
            const accepcted = await axios.post(
                `http://localhost:5000/teacher/acceptRequest`,
                { semail, temail },
                config
            );
            console.log(accepcted.data.data);
            setSize(size-2);
            // size=size-2
            getData();           
            
        } catch (err) {
            console.log('accept error '+err);
        }
    }

    const rejectHandler = async (semail) => {
        try {
            const rejected = await axios.post(
                `http://localhost:5000/teacher/rejectRequest`,
                { semail, temail },
                config
            );
            console.log(rejected.data.data);
            setSize(size-2);
            // size=size-2;
            getData();           


        } catch (err) {
            console.log('reject error '+err);
        }
    }

    const requestList = request.map((d) => {

        if (!d.status) {
            return (
                <div key={d._id} className="reqCard">
                    <div className="cardLeft">
                        {d.name}                        
                    </div>
                    <div className="cardRight">
                        <div className="reqAccept">
                            <Button onClick={()=>acceptHandler(d.semail)} variant="contained" color="primary">
                                Accept
                            </Button>
                        </div>
                        <div className="reqDecline">
                            <Button onClick={()=>rejectHandler(d.semail)} variant="contained" color="secondary">
                                Decline
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }


    })
    const EmptyList = () => {
        return (
            <div>
                No Requests
            </div>
        )
    }

    if (loading) {
        return (
            <div className='profileMain'>
                <CircularProgress />
                <NotificationContainer/>                


            </div>
        )
    }
    return (
        <div className="reqMain">
            <div className="reqHead">Pending Requests</div>
            <br></br>
            {size > 0 ? requestList : <EmptyList />}
            {/* {requestList} */}

            {/* <div className="reqCard">
                <div className="cardLeft">
                    Chinmay
                </div>
                <div className="cardRight">
                    <div className="reqAccept">
                        <Button variant="contained" color="primary">
                            Accept
                        </Button>
                    </div>
                    <div className="reqDecline">
                        <Button variant="contained" color="secondary">
                            Decline
                        </Button>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default RequestComp
