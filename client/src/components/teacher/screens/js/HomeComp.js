import React from 'react'
import Link from '@material-ui/core/Link';
import '../css/HomeComp.css'
const HomeComp = () => {
    return (
        <div>
            Welcome to LoR Manager. Read the <Link href='/teacher/instruction' style={{ color: '#31A34A' }}>Instructions</Link> before starting
            <div className="mainHome">

            </div>

        </div>
    )
}

export default HomeComp
