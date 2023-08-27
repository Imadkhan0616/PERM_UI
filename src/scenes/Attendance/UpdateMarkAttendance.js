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
import SelectInput from "../../components/Select/SelectInput";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export default function UpdateMarkAttendance() {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let navigate = useNavigate();

  const [lateentry, setLateentry] = useState(false);
  const [earlyexit, setEarlyExit] = useState(false);
  const [emergencyExit, setEmergencyExit] = useState(false);
  const [date, setDate] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const fetchData = async () => {
    const MarkAttendanceResponse = await getAsync('MarkAttendance', { 'SearchColumn': 'MarkAttendanceID', 'SearchValue': id.toString() })
      .catch((error) => {
        console.error('Error fetching MarkAttendances data:', error);
      });

    const MarkAttendance = MarkAttendanceResponse.data.list[0];

    setLateentry(MarkAttendance.lateentry);
    setEarlyExit(MarkAttendance.earlyexit);
    setDate(MarkAttendance.date);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEmployeeChange = (selectedValue) => {
    setSelectedEmployee(selectedValue);
  };

  const handleShiftChange = (selectedValue) => {
    selectedShift(selectedValue);
  };

  const handleStatusChange = (selectedValue) => {
    setSelectedStatus(selectedValue);
  };

  const shiftDataSourceApply = (applicationParamData = []) => {
    return applicationParamData.filter(item => item.applicationParamMasterID > 8);
  };

  const statusDataSourceApply = (applicationParamData = []) => {
    return applicationParamData.filter(item => item.applicationParamMasterID > 7);
  };

  const onSubmit = async () => {

    const markAttendanceResponse = await putAsync('MarkAttendance/Update', {
      businessPartnerID: selectedEmployee.value,
      Date,
      paramShiftID: selectedShift.value,
      paramAttendenceStatusID: selectedStatus.value,
      isLateEntry: lateentry,
      isEarlyExit: earlyexit,
      isEmergencyExit: earlyexit
    });


    alert(markAttendanceResponse.message);
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
                <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                Submit
              </Button>
            </Link>

          </Form></div>

      </Box>
    </Box>
  )
}