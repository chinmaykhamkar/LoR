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
                    1. Store all your LoRs on google drive or similar cloud app. 
                </Typography>
                <Typography>
                    2. Update your profile in the <Link href='/student/profile' style={{ color: '#DA2426' }}>Profile</Link> section by adding the link containing the LoRs.
                </Typography>
                <Typography>
                    3. Ask for the Email ID used by your teacher on this app and add that Email in the <Link href='/student/teachers' style={{ color: '#DA2426' }}>Teachers</Link> section to link that teacher with your account.
                </Typography>
                <Typography style={{fontWeight:'bold'}}>
                    Please do the above step before doing step 5.
                </Typography>
                <Typography>
                    4. Tell your teacher to accept your request.
                </Typography>
                <Typography>
                    5. Add your universities with deadline in the <Link href='/student/university' style={{ color: '#DA2426' }}>University</Link> section.
                </Typography>
                <Typography>
                    6. Wait for your teacher to update the status of your LoR on the portal 
                </Typography>
            </div>
        </div>
    )
}

export default InstructionComp
