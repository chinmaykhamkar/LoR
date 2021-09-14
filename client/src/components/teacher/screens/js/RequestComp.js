import { React, useState, useEffect } from 'react'
import '../css/RequestComp.css'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

var config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('authTokent')}` }
};

const RequestComp = () => {

    const [request, setRequest] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const name = localStorage.getItem('tname');
    const email = localStorage.getItem('email');

    useEffect(() => {
        getData();
    }, [request.name]);

    const getData = async () => {
        try {
            const requestData = await axios.get(`http://localhost:5000/teacher/request/${email}`, config);
            console.log(requestData.data.data);
            setRequest(requestData.data.data);
            setLoading(false);


        } catch (err) {
            console.log('error ' + err);

        }

    }

    const acceptHandler = async (semail) => {
            
    }

    // const rejectHandler 

    const requestList = request.map((d) => {
        if (!d.status) {
            return (
                <div key={d._id} className="reqCard">
                    <div className="cardLeft">
                        {d.name}
                    </div>
                    <div className="cardRight">
                        <div className="reqAccept">
                            <Button onClick={acceptHandler(d.email)} variant="contained" color="primary">
                                Accept
                            </Button>
                        </div>
                        <div className="reqDecline">
                            <Button variant="contained" color="secondary">
                                Decline
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }
    })

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
            {requestList}
            
            <div className="reqCard">
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
            </div>
        </div>
    )
}

export default RequestComp
