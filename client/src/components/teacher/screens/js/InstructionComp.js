import React from 'react'
import '../css/InstructionComp.css'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
const InstructionComp = () => {
    return (
        <div className="mainDivIns">
            <div className="mainTitleIns">Steps to follow</div>
            <div className="mainContentIns">
                <Typography>
                    1. This app will assist you to manage all the LoRs. 
                </Typography>
                <Typography>
                    2. Share your Email ID which you used here ( preferably use your college Email ) among the stdents getting a LoR from you.
                </Typography>
                <Typography>
                    3. Accept requests from legit students from the <Link href='/teacher/request' style={{ color: '#DA2426' }}>Request</Link> page.
                </Typography>
                <Typography>
                    4. Accepted students will appear in the  <Link href='/teacher/students' style={{ color: '#DA2426' }}>Students</Link> page.
                </Typography>
                <Typography>
                    5. Access the list of universities of each student with their deadlines by clicking on the student card.
                </Typography>
                <Typography>
                    5. The link for the LoR will be available on this screen to copy. If not then inform the student to update the LoR link asap. 
                </Typography>
                <Typography>
                    5. After uploading the LoR, change the status of that particular university and save.
                </Typography>
            </div>
        </div>
    )
}

export default InstructionComp
