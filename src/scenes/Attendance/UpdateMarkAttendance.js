import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import { colors, useTheme } from '@mui/material'
import { tokens } from "../theme";
import Header from "../../components/Header";
import { Button, Form, Checkbox } from 'semantic-ui-react'
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { getAsync, putAsync } from "../../helper/axiosHelper";
import EditIcon from "@mui/icons-material/Edit";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export default function UpdateMarkAttendance() {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let navigate = useNavigate();

  const [businessPartnerID, setbusinessPartnerID] = useState('');
  const [status, setStatus] = useState('');
  const [shift, setShift] = useState('');
  const [lateentry, setLateentry] = useState('');
  const [earlyexit, setEarlyExit] = useState('');
  const [date, setDate] = useState('');

  const fetchData = async () => {
    const MarkAttendanceResponse = await getAsync('MarkAttendance', { 'SearchColumn': 'MarkAttendanceID', 'SearchValue': id.toString() })
      .catch((error) => {
        console.error('Error fetching MarkAttendances data:', error);
      });

    const MarkAttendance = MarkAttendanceResponse.data.list[0];

    setbusinessPartnerID(MarkAttendance.businessPartnerID);
    setStatus(MarkAttendance.status);
    setShift(MarkAttendance.shift);
    setLateentry(MarkAttendance.lateentry);
    setEarlyExit(MarkAttendance.earlyexit);
    setDate(MarkAttendance.date);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async () => {
    await putAsync('MarkAttendance/Update', {
      MarkAttendanceID: id,
      businessPartnerID,
      date,
      shift,
      status,
      lateentry,
      earlyexit,
    }).then((response) => {
      alert(response.message);
      navigate('/GetMarkAttendance');
    })

}

return (
  <Box m="20px">
    <Header title="Employee Attendance" subtitle="Update Marked Attendance" />
    <Box display="flex" justifyContent="space-between"
      backgroundColor={colors.white[500]} color={colors.blue[900]}>
      <h4> <Box>
        <Link to={'/GetMarkAttendance'}>
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
      </Box> <br></br>
        Mark Attendance
      </h4>
    </Box>
    <Box display="flex" justifyContent="space-between"
      backgroundColor={colors.white[500]} color={colors.blue[900]}  >
      <Form className="create-form" style={{ backgroundColor: '#f4f5ff' }}>
        <div className="mb-3" >

          <label for="text">Employee Id</label>
          <input type="number" min="0" step="1"
            placeholder="Enter Employee ID" name="businessPartnerID" required value={businessPartnerID}
            onChange={(e) => setbusinessPartnerID(e.target.value)} />
          <label for="pwd">Date:</label>
          <input type="date" id="txt1" value={date}
            name="fromdate" required
            onChange={(e) => setDate(e.target.value)} />

          <Form.Field>
            <Checkbox label='Staus'
              onChange={(e) => setStatus(e.target.value)} />
          </Form.Field>

          <label for="Type">Shift:</label>
          <select id="Type" name="Type" onChange={(e) => setShift(e.target.value)} value={shift} >
            <option value="">Select</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>

          <label for="Type">Status</label>
          <select id="Type" name="Type" onChange={(e) => setStatus(e.target.value)} value={status} >
            <option value="">Select</option>
            <option value="Present">Present</option>
            <option value="Leave">Leave</option>
            <option value="Sick-Leave">Sick-leave</option>
            <option value="On-duty">On-duty</option>

          </select>

          <label for="Type">Late Entry:</label>
          <select id="Type" name="Type" onChange={(e) => setLateentry(e.target.value)} value={lateentry} >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <label for="Type">Early Exit:</label>
          <select id="Type" name="Type" onChange={(e) => setEarlyExit(e.target.value)} value={earlyexit} >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <Link to={`/GetMarkAttendance`}>
        <Button type='submit' onClick={onSubmit}>
        <EditIcon sx={{ mr: "10px" }} />

          Update</Button>
        </Link>

      </Form>

    </Box>
  </Box>
)
}

