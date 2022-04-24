import { Paper, Tab, Tabs, Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import MLogin from "../components/MLogin";
import MRegister from '../components/MRegister';

const LogReg = (props) => {
    const [val, setVal] = useState(0);

    const handleChange = (e, newVal) =>{
        setVal(newVal);
    }
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
                )}
            </div>
        );
    }

    return (
        <Paper style={{
            marginTop: "2vh",
            margin: "auto",
            width: "50vh",
            padding: "2vh"
        }}>
            <Tabs
            indicatorColor='primary'
            textColor='primary'
            value={val}
            onChange={handleChange}
            >
                <Tab label="Login" />
                <Tab label="Register"/>
                
            </Tabs>
            <TabPanel value={val} index={0}>
            <MLogin/>
            </TabPanel>
            <TabPanel value={val} index={1}>
            <MRegister />
            </TabPanel>
        </Paper>
    )
}

export default LogReg;


// const LogReg = (props) => {
//     return (
//         <div >
//             <div>
//                 <MRegister />
//                 <MLogin/>
//             </div>
//         </div>
//     )
// }

// export default LogReg;