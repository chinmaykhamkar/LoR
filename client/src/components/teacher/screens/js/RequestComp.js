import { React, useState, useEffect } from 'react'
import '../css/RequestComp.css'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import swal from 'sweetalert';

var config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('authTokent')}` }
};
var size;
var name = localStorage.getItem('tname');
var temail = localStorage.getItem('email');
const RequestComp = () => {

    const [request, setRequest] = useState([{}]);
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, [request.name]);

    const getData = async () => {
        try {
            const requestData = await axios.get(`http://localhost:5000/teacher/request/${temail}`, config);
            console.log(requestData.data.data);
            setRequest(requestData.data.data);
            for(let i=0;i<requestData.data.data.length;i++){
                if(!requestData.data.data[i].status){
                    size++;
                }
            }
            // size = requestData.data.data.length;
            setLoading(false);


        } catch (err) {
            console.log('error ' + err);

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
            getData();
            size--;
            
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
            getData();
            size--;

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
