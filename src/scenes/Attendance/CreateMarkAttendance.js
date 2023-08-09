import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { tokens } from "../theme";
import Header from '../../components/Header';
import { useNavigate } from "react-router";
import { Box, useTheme } from '@mui/material'
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DownloadDoneOutlinedIcon from '@mui/icons-material/DownloadDoneOutlined';
import { postAsync } from "../../helper/axiosHelper";
import SelectInput from '../../components/Select/SelectInput';



export default function CreateMarkAttendance() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [businessPartnerID, setbusinessPartnerID] = useState('');
  const [status, setStatus] = useState('');
  const [shift, setShift] = useState('');
  const [lateentry, setLateentry] = useState('');
  const [earlyexit, setEarlyExit] = useState('');
  const [date, setDate] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const history = useNavigate();

  const handleEmployeeChange = (selectedValue) => {
    setSelectedEmployee(selectedValue);
  };

  const onSubmit = async () => {

    const markAttendanceResponse = await postAsync('MarkAttendance/Add', {
      businessPartnerID,
      date,
      shift,
      status,
      lateentry,
      earlyexit,
    });


    alert(markAttendanceResponse.message);
    history("/GetMarkAttendance");
  }
  return (
    <Box m="20px">
      <Header title="Employee Attendance" />
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
        <h4> <Box>
          <Link to={`GetMarkAttendance`}>
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
        </h4>
      </Box>
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[100]} color={colors.blue[900]}  >
        <div style={{ height: '550px', overflow: 'auto', width: '1130px', backgroundColor: '#f4f5ff' }}>

          <Form className="create-form">
            <div className="mb-3">
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <div style={{ marginRight: '1rem', width: '20%' }}>
                  <label for="text">Employee </label>
                  <SelectInput
                    placeholde="Select Employee"
                    apiUrl="BusinessPartner"
                    valueField="businessPartnerID"
                    lableField="BusinessPartner"
                    selectedOption={selectedEmployee}
                    onValueChange={handleEmployeeChange} />
                </div>
                <div style={{ marginRight: '1rem', width: '20%' }}>
                  <label htmlFor="pwd">Date:</label>
                  <input
                    type="date"
                    id="txt1"
                    name="fromdate"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              {/*<Form.Field>
                    <Checkbox label='Status'
                    onChange={(e)=>setCheckbox(e.target.value)} />
          </Form.Field>*/}
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <div style={{ marginRight: '1rem', width: '20%' }}>
                  <label htmlFor="shift">Shift:</label>
                  <select id="shift" name="shift" onChange={(e) => setShift(e.target.value)}>
                    <option value="Male">Select</option>
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>
                <div style={{ marginRight: '1rem', width: '20%' }}>
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
                <div style={{ marginRight: '1rem', width: '20%' }}>
                  <label for="Type">Late Entry:</label>
                  <select id="Type" name="Type" onChange={(e) => setLateentry(e.target.value)} >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select></div>
                <div style={{ marginRight: '1rem', width: '20%' }}>
                  <label for="Type">Early Exit:</label>
                  <select id="Type" name="Type" onChange={(e) => setEarlyExit(e.target.value)} >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div></div></div>

            <Link to={`/GetMarkAttendance`}>
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

          </Form></div>

      </Box>
    </Box>
  )

}