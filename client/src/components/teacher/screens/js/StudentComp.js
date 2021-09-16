import React from 'react'
import '../css/StudentComp.css'
const StudentComp = () => {
    return (
        <div className="studMain">
            <div className="studTitle">
                Student List
            </div>
            <div className="studContent">
                <div className="studCard">
                    <div className="studHead">
                        <div className='studKey'>Student Name</div>
                        <div className='studVal'>Chinmay</div>
                    </div>
                    <div className="studHead">
                        <div className='studKey'>Total Universities</div>
                        <div className='studVal'>6</div>
                    </div>
                    <div className="studHead">
                        <div className='studKey'>Pending LoRs</div>
                        <div className='studVal'>5</div>
                    </div>
                </div>
                <br></br>
                <div className="studCard">
                    <div className="studHead">
                        <div className='studKey'>Student Name</div>
                        <div className='studVal'>Chinmay</div>
                    </div>
                    <div className="studHead">
                        <div className='studKey'>Total Universities</div>
                        <div className='studVal'>6</div>
                    </div>
                    <div className="studHead">
                        <div className='studKey'>Pending LoRs</div>
                        <div className='studVal'>5</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentComp
