import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { tokens } from "../theme";
import Header from '../../components/Header';
import { useNavigate } from "react-router";
import { Box, useTheme } from '@mui/material'
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

export default function MAttcreate() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [empid, setEmpid] = useState('');
    const [date, setDate] = useState('');
    const [checkbox, setCheckbox] = useState('');
    const [shift, setShift] = useState('');
    const [status, setStatus] = useState('');
    const [lateentry, setLateentry] = useState('');
    const [earlyexit, setEarlyExit] = useState('');

    const history = useNavigate();


    console.log(checkbox)
    const postData = () => {
      if (!empid) {
        alert('Please enter the employee ID.');
        return;
      }
    
      // Check if status is selected
      if (status === '') {
        alert('Please enter status.');
        return;
      }
      if (!date) {
        alert('Please select a date.');
        return;
      }
        axios.post(`https://64665758ba7110b6639e57a4.mockapi.io/api/attendance/AttendanceMark`, {
            empid,
            date,
            checkbox,
            shift,
            status,
            lateentry,
            earlyexit,
        }).then(() => {
            history('/MAttread')
        })
    }
    return(
        <Box m="20px">
        <Header title="Employee Attendance" />
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
            href='/MAttread'
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Show Data
          </Button>
        </Box> <br></br>
            </h4>
        </Box>
        <Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[100]} color={colors.blue[900]}  >   
     <div style={{ height: '550px', overflow: 'auto', width:'1130px', backgroundColor: '#f4f5ff'}}>    

        <Form className="create-form">
        <div className="mb-3">
        <div style={{ display: 'flex', marginBottom: '1rem' }}>
          <div style={{ marginRight: '1rem', width: '20%'  }}>
            <label htmlFor="text">Employee Id</label>
            <input
              type="number"
              min="0"
              step="1"
              placeholder="Enter Employee ID"
              name="empid"
              required
              onChange={(e) => setEmpid(e.target.value)}
            />
          </div>
          <div style={{ marginRight: '1rem', width: '20%'  }}>
            <label htmlFor="pwd">Date:</label>
            <input
              type="date"
              id="txt1"
              name="fromdate"
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
{/*<Form.Field>
                    <Checkbox label='Status'
                    onChange={(e)=>setCheckbox(e.target.value)} />
          </Form.Field>*/}
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
              <div style={{ marginRight: '1rem', width: '20%'  }}>
            <label htmlFor="shift">Shift:</label>
            <select id="shift" name="shift" onChange={(e) => setShift(e.target.value)}>
              <option value="Male">Select</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
          <div style={{ marginRight: '1rem', width: '20%'  }}>
            <label htmlFor="status">Status:</label>
            <select id="status" name="status" onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select</option>
              <option value="Present">Present</option>
              <option value="Leave">Leave</option>
              <option value="Sick-Leave">Sick-leave</option>
              <option value="On-duty">On-duty</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <div style={{ marginRight: '1rem', width: '20%'  }}>
 <label for="Type">Late Entry:</label>
  <select id="Type" name="Type" onChange={(e)=>setLateentry(e.target.value)} >
  <option value="">Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select></div>
  <div style={{ marginRight: '1rem', width: '20%'  }}>
  <label for="Type">Early Exit:</label>
  <select id="Type" name="Type" onChange={(e)=>setEarlyExit(e.target.value)} >
  <option value="">Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div></div></div>

<Button   
 type="submit" color='#0a1f2e' className="btn-primary"  onClick={postData} 
 >Submit</Button>

  </Form></div>
  
  </Box>
  </Box>
  )

}