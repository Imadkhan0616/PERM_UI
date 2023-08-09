import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { tokens } from "../theme";
import Header from '../../components/Header';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Box, useTheme } from '@mui/material'
import { postAsync } from '../../helper/axiosHelper';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SelectInput from '../../components/Select/SelectInput';
import DownloadDoneOutlinedIcon from '@mui/icons-material/DownloadDoneOutlined';




export default function Acreate() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [attendanceRequestID, setAttendanceRequestID] = useState('');
  const [businessPartnerID, setBusinessPartnerID] = useState('');
  const [fromDate, setFromdate] = useState('');
  const [toDate, setTodate] = useState('');
  const [halfDay, setHalfDay] = useState(false);
  const [reason, setReason] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  
  const history = useNavigate();

  const handleEmployeeChange = (selectedValue) => {
    setSelectedEmployee(selectedValue);
  };

  const onSubmit = async () => {
   const attendanceRequestResponse =  await postAsync('AttendanceRequest/Add', {
      attendanceRequestID,
      businessPartnerID,
      fromDate,
      toDate,
      halfDay,
      reason
    });
      alert(attendanceRequestResponse.message);
      history('/AttendanceRequest')
    }
  return (
    <Box m="20px">
      <Header title="Employee Attendance Request" />
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
        <h4> <Box>
          <Link to={`/Aread`}>
          <Button
            sx={{
              backgroundColor: colors.white[100],
              color: colors.blue[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", borderRadius: '15px', boxShadow: '1px 2px 9px #aed7f4'
            }}
          >
            <VisibilityOutlinedIcon sx={{ mr: "10px" }} />
            Show Data
          </Button>
          </Link>
        </Box>
          <br></br>
        </h4>
      </Box>
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[100]} color={colors.blue[900]}  >
        <Form className="create-form">
          <div className="mb-3">

            <label for="text">Code</label>
            <input type="number" min="0" step="1"   
              placeholder="Code" name="attendanceRequestID" required
              value={attendanceRequestID}
              onChange={(e) => setAttendanceRequestID(e.target.value)} />

          <label for="text">Employee</label>
            <SelectInput
              placeholde="Select Employee"
              apiUrl="BusinessPartner"
              valueField="businessPartnerID"
              lableField="code"
              selectedOption={selectedEmployee}
              onValueChange={handleEmployeeChange} />
              
            <label for="pwd">From Date:</label>
            <input type="date" id="txt1"
              name="fromdate" required
              value={fromDate}
              onChange={(e) => setFromdate(e.target.value)} />

            <label for="">To Date:</label>
            <input type="date" id="txt1"
              name="todate" required
              value={toDate}
              onChange={(e) => setTodate(e.target.value)} />
              
            <Form.Field>
              <Checkbox label='Half day'
              value={halfDay}
                onChange={(e) => setHalfDay(e.target.value)} />
            </Form.Field>

            <label for="text">Reason:</label>
            <input type="text" id="txct2"
              placeholder="Reason" name="reason" sx={{ width: '20px', Height: '40px' }}
              value={reason}
              onChange={(e) => setReason(e.target.value)} />

          </div>
          <Link to={`/Aread`}>
          <Button
            type="submit"
            color="#0a1f2e"
            className="btn-primary"
            onClick={onSubmit}
          >
                  <DownloadDoneOutlinedIcon sx={{ mr: "10px" }} />
            Submit
          </Button>
          </Link>

        </Form>

      </Box>
    </Box>
  )

}