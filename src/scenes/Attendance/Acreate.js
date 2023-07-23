import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { tokens } from "../theme";
import Header from '../../components/Header';
import { useNavigate } from "react-router";
import { Box, useTheme } from '@mui/material'
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { postAsync } from '../../helper/axiosHelper';


export default function Acreate() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [attendanceRequestID, setAttendanceRequestID] = useState('');
  const [fromDate, setFromdate] = useState('');
  const [toDate, setTodate] = useState('');
  const [halfDay, setHalfDay] = useState(false);
  const [reason, setReason] = useState('');
  const [isdeleted, setIsdeleted] = useState('');
  const [createdby, setCreatedby] = useState('');
  const [createdon, setCreatedOn] = useState('');
  const history = useNavigate();

  const postData = async () => {
    await postAsync('AttendanceRequest/Add', {
      attendanceRequestID,
      fromDate,
      toDate,
      halfDay,
      reason

    }).then((response) => {
      console.log(response.message);
      history('/AttendanceRequest')
    });
  }
  return (
    <Box m="20px">
      <Header title="Employee Attendance Request" />
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
        <h4> <Box>
          <Button
            sx={{
              backgroundColor: colors.white[100],
              color: colors.blue[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", borderRadius: '15px', boxShadow: '1px 2px 9px #aed7f4'
            }}
            href='/Aread'
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Show Data
          </Button>
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
              placeholder="Code" name="empid" required
              onChange={(e) => setAttendanceRequestID(e.target.value)} />
            <label for="pwd">From Date:</label>
            <input type="date" id="txt1"
              name="fromdate" required
              onChange={(e) => setFromdate(e.target.value)} />

            <label for="">To Date:</label>
            <input type="date" id="txt1"
              name="todate" required
              onChange={(e) => setTodate(e.target.value)} />
            <Form.Field>
              <Checkbox label='Half day'
                onChange={(e) => setHalfDay(e.target.value)} />
            </Form.Field>
            <label for="text">Reason:</label>
            <input type="text" id="txct2"
              placeholder="Reason" name="reason" sx={{ width: '20px', Height: '40px' }}
              onChange={(e) => setReason(e.target.value)} />
          </div>
          <Button
            type="submit" color='#0a1f2e' className="btn-primary" onClick={postData}
          >Submit</Button>

        </Form>

      </Box>
    </Box>
  )

}