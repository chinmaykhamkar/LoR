import { React, useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import '../css/StudentUniListScreen.css'
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

const StudentUniComp = () => {

    const [copied, setCopied] = useState("");

    return (
        <div className="uniMain">
            <div className="uniTitle">
                University List
            </div>
            <br></br>
            <div className="uniLor">
                <Button variant="contained" color="primary" onClick={() => {
                    navigator.clipboard.writeText('lor link');
                    setCopied('Copied');
                    setTimeout(() => {
                        setCopied('');
                    }, 2000);
                }}>LoR Link</Button>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 5, fontSize: 'small', fontWeight: 400 }}>{copied}</div>
            </div>
            <br></br>
            <div className="uniCard">
                <div style={{display:'flex'}}>
                    <div className="uniName">
                        Arizona state university
                    </div>
                    <div className="uniDeadline">
                        25/12/2021
                    </div>
                    <div className="uniStatus">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                            >
                                <MenuItem value={10}>Pending</MenuItem>
                                <MenuItem value={20}>Done</MenuItem>

                            </Select>
                        </FormControl>
                    </div>
                </div>
                
                <div className="uniSave">
                    <Button variant="contained" type="submit" color="primary">
                        Save
                    </Button>
                </div>
            </div>
            <div className="uniCard">
                <div style={{display:'flex'}}>
                    <div className="uniName">
                        Arizona state university
                    </div>
                    <div className="uniDeadline">
                        25/12/2021
                    </div>
                    <div className="uniStatus">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                            >
                                <MenuItem value={10}>Pending</MenuItem>
                                <MenuItem value={20}>Done</MenuItem>

                            </Select>
                        </FormControl>
                    </div>
                </div>
                
                <div className="uniSave">
                    <Button variant="contained" type="submit" color="primary">
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default StudentUniComp
