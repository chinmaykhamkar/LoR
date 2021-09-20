import React from 'react';
import '../css/uniHomeList.css';

const UniHomeList = (props) => {
    const arr = props.count;
    // console.log(arr);

    const list = arr.map((d) => {
        const bg = (d.status ? '#8BE78B' : '#FFFDAF')
        return (
            <div style={{ backgroundColor: `${bg}`}} className="tableItem">
                {d.shortForm}
            </div>
        )
    })

    return (
        <React.Fragment>
            {list}
            {/* <div style={{ backgroundColor: '#8BE78B' }} className="tableItem">
                ASU
            </div>
            <div className="tableItem">
                PSU
            </div>
            <div style={{ backgroundColor: '#FFFDAF' }} className="tableItem">
                NSU
            </div> */}
        </React.Fragment>

    )
}

export default UniHomeList
