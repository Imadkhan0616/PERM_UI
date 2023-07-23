import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import {Box} from "@mui/material";
import { colors, useTheme } from '@mui/material'
import { tokens } from "../theme";
import Header from "../../components/Header";
import { Button, Form, Checkbox } from 'semantic-ui-react'
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const Aupdate = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let navigate = useNavigate();
  
  const [id, setId] = useState(0);
    const  [empid, setEmpid]= useState("");
     const  [fromdate,setFromdate]= useState("");
     const  [todate, setTodate]= useState("");
     const  [checkbox, setCheckbox]= useState("");
     const  [reason, setReason]= useState("");

  
  useEffect(() => {
    setId(localStorage.getItem("id"));
    setEmpid(localStorage.getItem("empid", empid));
    setFromdate(localStorage.getItem("fromdate", fromdate));
    setTodate(localStorage.getItem("todate", todate));
    setCheckbox(localStorage.getItem("checkbox", checkbox));
    setReason(localStorage.getItem("reason", reason));
  }, []);
  
  const updateAPIData = () => {
    if (!empid) {
      alert('Please enter the employee ID.');
      return;
    }
    if (!fromdate) {
      alert('Please enter date.');
      return;
    }
    if (!todate) {
      alert('Please enter date.');
      return;
    }
    if (new Date(fromdate) >= new Date(todate)) {
      alert('Please select proper dates.');
      return;
    }
    axios.put(`https://646296267a9eead6fad2c898.mockapi.io/api/V1/Attendance/${id}`, {
      id:id,
      empid: empid,
      fromdate: fromdate,
      todate: todate,
      checkbox: checkbox,
      reason: reason,

  }).then(() => {
    navigate("/Aread");
  })
  }
  return(
    <Box m="20px">
    <Header title="Employee Attendance" subtitle="Update Attendance Request" />
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
        href='/Aread'
      >
        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
        Show Data
      </Button>
    </Box> <br></br>
          Request Attendance 
        </h4>
    </Box>
    <Box display="flex" justifyContent="space-between"  
    backgroundColor={colors.white[500]} color={colors.blue[900]}  >   
    
    <Form className="create-form">
      <div className="mb-3">
<label for="text">Employee Id</label>
  <input type="number" min="0" step="1" value={empid}
        placeholder="Enter Employee ID" name="empid" required
        onChange={(e)=>setEmpid(e.target.value)} />
  <label for="pwd">From Date:</label>
  <input type="date" id="txt1" value={fromdate}
         name="fromdate" required
        onChange={(e)=>setFromdate(e.target.value)} />

<label for="">To Date:</label>
<input type="date" id="txt1" 
         name="todate" required value={todate}
        onChange={(e)=>setTodate(e.target.value)} />
         <Form.Field>
                <Checkbox label='Half day'
                onChange={(e)=>setCheckbox(e.target.value)} />
            </Form.Field>

<label for="text">Reason:</label>
  <input type="text" id="txct2" value={reason}
        placeholder="" name="reason" sx={{width:'20px', Height:'40px'}}
        onChange={(e)=>setReason(e.target.value)}/>
        </div>
        <Button type='submit' onClick={updateAPIData}>Update</Button>

</Form>

</Box>
</Box>
)

}


export default Aupdate;