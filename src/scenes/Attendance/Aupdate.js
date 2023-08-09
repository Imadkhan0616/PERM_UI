import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import { colors, useTheme } from '@mui/material'
import { tokens } from "../theme";
import Header from "../../components/Header";
import { Button, Form, Checkbox } from 'semantic-ui-react'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SelectInput from '../../components/Select/SelectInput';
import { getAsync, putAsync } from "../../helper/axiosHelper";
import EditIcon from "@mui/icons-material/Edit";
import { DownloadDoneOutlined } from "@mui/icons-material";



export default function UpdateAttendanceRequest(){
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let navigate = useNavigate();

  // const [attendanceRequestID, setAttendanceRequestID] = useState("");
  const [businessPartnerID, setbusinessPartnerID] = useState("");
  const [fromdate, setFromdate] = useState("");
  const [todate, setTodate] = useState("");
  const [halfDay, sethalfDay] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [reason, setReason] = useState("");

  const fetchData = async () => {
    const attendanceRequestResponse = await getAsync('AttendanceRequest', { 'SearchColumn': 'attendanceRequestID', 'SearchValue': id.toString() })
      .catch((error) => {
        console.error('Error fetching attendance request data:', error);
      });

        const attendanceRequest = attendanceRequestResponse.data.list[0];

        setbusinessPartnerID(attendanceRequest.businessPartnerID);
        setFromdate(attendanceRequest.fromdate);
        setTodate(attendanceRequest.todate);
        sethalfDay(attendanceRequest.halfDay);
        setReason(attendanceRequest.reason);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEmployeeChange = (selectedValue) => {
    setSelectedEmployee(selectedValue);
  };

  const onSubmit = async () => {
    await putAsync('AttendenceRequest/Update', {
      attendanceRequestID: id,
      businessPartnerID,
      fromdate,
      todate,
      halfDay,
      reason 
    }).then((response) => {
      alert(response.message);
      navigate('/Aread');
    })
  }

  const updateAPIData = () => {
    if (!businessPartnerID) {
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
   
  }
  return (
    <Box m="20px">
      <Header title="Employee Attendance" subtitle="Update Attendance Request" />
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
        </Box> <br></br>
          Request Attendance
        </h4>
      </Box>
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[500]} color={colors.blue[900]}  >

        <Form className="create-form">
          <div className="mb-3">
            <label for="text">Employee Id</label>
            <SelectInput
              placeholde="Select Employee"
              apiUrl="BusinessPartner"
              valueField="businessPartnerID"
              lableField="code"
              selectedOption={selectedEmployee}
              onValueChange={handleEmployeeChange} />
            <label for="pwd">From Date:</label>
            <input type="date" id="txt1" value={fromdate}
              name="fromdate" required
              onChange={(e) => setFromdate(e.target.value)} />

            <label for="">To Date:</label>
            <input type="date" id="txt1"
              name="todate" required value={todate}
              onChange={(e) => setTodate(e.target.value)} />
            <Form.Field>
              <Checkbox label='Half day'
                onChange={(e) => sethalfDay(e.target.value)} />
            </Form.Field>

            <label for="text">Reason:</label>
            <input type="text" id="txct2" value={reason}
              placeholder="" name="reason" sx={{ width: '20px', Height: '40px' }}
              onChange={(e) => setReason(e.target.value)} />
          </div>
          <Link to={`/Aread`}>
          <Button type='submit' onClick={updateAPIData}>
          <DownloadDoneOutlined sx={{ mr: "10px" }} />

            Update</Button>
</Link>
        </Form>

      </Box>
    </Box>
  )

}

