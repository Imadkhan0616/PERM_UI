import React, { useState } from 'react';
import { Button, checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { tokens } from "../theme";
import Header from '../../components/Header';
import { useNavigate } from "react-router";
import { Box, useTheme } from '@mui/material'
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { postAsync } from '../../helper/axiosHelper';


export default function CreateTask() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [taskID, setTaskID] = useState('');
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [isActive, setIsActive] = useState('');
    const [deadline, setDeadline] = useState('');
    const [targetCompletionDate, setTargetCompletiondate] = useState('');
    const [assignedto, setAssignedto] = useState('');
    const [assignedby, setAssignedby] = useState('');

    const history = useNavigate();


    console.log("checkbox")
    const postData = async () => {
      await postAsync('Tasks/Add', {
        taskID,
        taskName,
        taskDescription,
        isActive,
        deadline,
        targetCompletionDate,
        assignedby,
        assignedto
      }).then((response) => {
        console.log(response.message);
        history('/Tasks')
      });
    }
    return(
        <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center" > 
        <Header title="Employee Tasks" />
        <Box>
          <Button 
            sx={{
              backgroundColor: colors.white[100],
              color: colors.blue[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", borderRadius:'15px', boxShadow:'1px 2px 9px #aed7f4'
            }}href='/ReadTask'
          >
Show Tasks          </Button> 
        </Box>
      </Box>            
        <Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[100]} color={colors.blue[900]}  >   
        <Form className="create-form">
        <div className="mb-3">
            
    {/* <label for="text">Employee Id</label>
      <input type="number" min="0" step="1" 
            placeholder="Enter Task ID" name="empid" required
            onChange={(e)=>setTaskID(e.target.value)} /> */}
<label for="text">Code:</label>
      <input type="text" id="txct2" 
            placeholder="Code" name="reason" sx={{width:'20px', Height:'40px'}}
            onChange={(e)=>setTaskID(e.target.value)}/>

 <label for="text">Title:</label>
      <input type="text" id="txct2" 
            placeholder="Title" name="reason" sx={{width:'20px', Height:'40px'}}
            onChange={(e)=>setTaskName(e.target.value)}/>

<label for="text">Description:</label>
      <input type="text" id="txct2" 
            placeholder="Description" name="reason" sx={{width:'20px', Height:'40px'}}
            onChange={(e)=>setTaskDescription(e.target.value)}/>
            <br></br>

            <label for="text">Status:</label>
      <input type="checkbox" id="txct2" 
            placeholder="isActive" name="reason" sx={{width:'20px', Height:'40px'}}
            onChange={(e)=>setIsActive(e.target.value)}/>
            <br></br>

{/* <label for="Type">Status</label>
<select id="Type" name="Type" onChange={(e)=>setStatus(e.target.value)} >
<option value="">Select</option>
<option value="Completed">Completed</option>
<option value="In-progress">In-progress</option>
<option value="On-hold">On-hold</option>
<option value="Over-due">Over-due</option>
<option value="Awaited Review">Awaited Review</option>

</select> */}

{/* <label for="text">Task Priority Id</label>
      <input type="number" min="0" step="1" 
            placeholder="Enter Employee ID" name="TPid" requiredc
            onChange={(e)=>setTPid(e.target.value)} /> */}

      <label for="pwd">Deadline:</label>
      <input type="date" id="txt1" 
             name="fromdate" required
            onChange={(e)=>setDeadline(e.target.value)} />

<label for="pwd">Completion Date:</label>
      <input type="date" id="txt1" 
             name="fromdate" 
            onChange={(e)=>setTargetCompletiondate(e.target.value)} />

<label for="text">Assigned to:</label>
      <input type="text" id="txct2" 
            placeholder="" name="reason" sx={{width:'20px', Height:'40px'}} required
            onChange={(e)=>setAssignedto(e.target.value)}/>

<label for="text">Assigned by:</label>
      <input type="text" id="txct2" 
            placeholder="" name="reason" sx={{width:'20px', Height:'40px'}}
            onChange={(e)=>setAssignedby(e.target.value)}/>

{/* <label for="text">Task Type Id</label>
      <input type="number" min="0" step="1" 
            placeholder="Enter Employee ID" name="TPid" required
            onChange={(e)=>setTypeid(e.target.value)} /> */}
    </div>
<Button   
 type="submit" color='#0a1f2e' className="btn-primary"  onClick={postData} 
 >Submit</Button>

  </Form>
  
  </Box>
  </Box>
  )

}