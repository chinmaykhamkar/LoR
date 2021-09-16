import React from 'react'
import swal from 'sweetalert';
import Link from '@material-ui/core/Link';


// let count = localStorage.getItem("counter");

const HomeComp = () => {

   

    return (
        <div>
            Welcome to LoR Manager. Read the <Link href='/student/instruction' style={{ color: '#DA2426' }}>Instructions</Link> before starting.
        </div>
    )
}

export default HomeComp
