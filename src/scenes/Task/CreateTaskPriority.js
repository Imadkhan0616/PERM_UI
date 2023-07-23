import React, { useState } from 'react';
import { Button, checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { tokens } from "../theme";
import Header from '../../components/Header';
import { useNavigate } from "react-router";
import { Box, useTheme } from '@mui/material'
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

export default function CreateTask() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [taskpid, setTaskpid] = useState('');
    const [priority, setPriority] = useState('');
  

    const history = useNavigate();


    console.log("checkbox")
    const postData = () => {
        axios.post(`http://localhost:5072/api/Tasks/Add`, {
            taskpid,
            priority,
        }).then(() => {
            history.push('/ReadTaskPriority')
        })
    }
    return(
        <Box m="20px">
        <Header title="Employee Task Priority" subtitle="Create Employee Task Priority" />
        <Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
           <h4> <Box>
          <Button
            sx={{
              backgroundColor: colors.white[100],
              color: colors.blue[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",borderRadius:'15px', boxShadow:'1px 2px 9px #aed7f4'
            }}
            href='/ReadTaskPrioruty'
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Show Data
          </Button>
        </Box> <br></br>
              Employee Task Priority
            </h4>
        </Box>
        <Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[100]} color={colors.blue[900]}  >   
        <Form className="create-form">
            
    <label for="text">Task Priority Id</label>
      <input type="number" min="0" step="1" 
            placeholder="Enter Employee ID" name="empid" required
            onChange={(e)=>setTaskpid(e.target.value)} />

 <label for="text">Priority Name:</label>
      <input type="text" id="txct2" 
            placeholder="" name="reason" sx={{width:'20px', Height:'40px'}}
            onChange={(e)=>setPriority(e.target.value)}/>


<Button   
 type="submit" color='#0a1f2e' className="btn-primary"  onClick={postData} 
 >Submit</Button>

  </Form>
  
  </Box>
  </Box>
  )

}