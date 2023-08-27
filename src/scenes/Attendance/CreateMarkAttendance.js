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

  const [lateentry, setLateentry] = useState(false);
  const [earlyexit, setEarlyExit] = useState(false);
  const [emergencyExit, setEmergencyExit] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const history = useNavigate();

  const handleEmployeeChange = (selectedValue) => {
    setSelectedEmployee(selectedValue);
  };

  const handleShiftChange = (selectedValue) => {
    setSelectedShift(selectedValue);
  };

  const handleStatusChange = (selectedValue) => {
    setSelectedStatus(selectedValue);
  };

  const shiftDataSourceApply = (applicationParamData = []) => {
    return applicationParamData.filter(item => item.applicationParamMasterID === 8);
  };

  const statusDataSourceApply = (applicationParamData = []) => {
    return applicationParamData.filter(item => item.applicationParamMasterID === 7);
  };

  const hanldeDateChange = (e) => {
    console.log(e.target.value);
    setDate(e.target.value);
  };

  const onSubmit = async () => {

    const markAttendanceResponse = await postAsync('MarkAttendance/Add', {
      businessPartnerID: selectedEmployee.value,
      date,
      paramShiftID: selectedShift.value,
      paramAttendenceStatusID: selectedStatus.value,
      isLateEntry: lateentry,
      isEarlyExit: earlyexit,
      isEmergencyExit: earlyexit
    });


    alert(markAttendanceResponse.message);
    history("/Aread");
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
                    lableField="nameWithCode"
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
                  <SelectInput
                    placeholde="Select Shift"
                    apiUrl="ApplicationParam"
                    valueField="applicationParamDetailID"
                    lableField="paramKey"
                    selectedOption={selectedShift}
                    onDataSourceApply={shiftDataSourceApply}
                    onValueChange={handleShiftChange} />
                </div>
                <div style={{ marginRight: '1rem', width: '20%' }}>
                  <label htmlFor="status">Status:</label>
                  <SelectInput
                    placeholde="Select Status"
                    apiUrl="ApplicationParam"
                    valueField="applicationParamDetailID"
                    lableField="paramKey"
                    selectedOption={selectedStatus}
                    onDataSourceApply={statusDataSourceApply}
                    onValueChange={handleStatusChange} />
                </div>
              </div>
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <div style={{ marginRight: '1rem', width: '20%' }}>
                  <label for="Type">Late Entry:</label>
                  <input
                    type="checkbox"
                    name="lateentry"
                    required
                    checked={lateentry}
                    onChange={(e) => setLateentry(e.target.value)}
                  />
                </div>
                <div style={{ marginRight: '1rem', width: '20%' }}>
                  <label for="Type">Early Exit:</label>
                  <input
                    type="checkbox"
                    name="earlyexit"
                    required
                    checked={earlyexit}
                    onChange={(e) => setEarlyExit(e.target.value)}
                  />
                </div>
                <div style={{ marginRight: '1rem', width: '20%' }}>
                  <label for="Type">Emergency Exit:</label>
                  <input
                    type="checkbox"
                    name="emergencyExit"
                    required
                    checked={emergencyExit}
                    onChange={(e) => setEmergencyExit(e.target.value)}
                  />
                </div>
              </div>
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

          </Form></div>

      </Box>
    </Box>
  )

}