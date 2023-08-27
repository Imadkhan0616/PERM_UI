import React, { useEffect, useState } from 'react';
import { Table, checkbox } from 'semantic-ui-react'
import axios from 'axios';
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import Header from '../../components/Header'
import { colors, useTheme } from '@mui/material'
import { tokens } from "../theme";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { deleteAsync, getAsync } from "../../helper/axiosHelper";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';

const GetMarkAttendance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const setData = (data) => {
    let {
      markAttendanceID,
      businessPartnerID,
      date,
      status,
      shift,
      lateentry,
      earlyexit
    } = data;
    localStorage.setItem('markAttendanceID', markAttendanceID);
    localStorage.setItem('businessPartnerID', businessPartnerID);
    localStorage.setItem('date', date);
    localStorage.setItem('status', status);
    localStorage.setItem('shift', shift);
    localStorage.setItem('lateentry', lateentry);
    localStorage.setItem('earlyexit', earlyexit);
  };

  const getData = async () => {
    await getAsync('MarkAttendance')
      .then((response) => {
        setAPIData(response.data.list);
      });
  };

  const onDelete = async (markAttendanceID) => {
    deleteAsync('MarkAttendance/Delete', {
      markAttendanceID
    }).then((response) => {
      alert(response.message);
      getData();
    });
  };
  const exportPdf = async () => {
    // const doc = new jsPDF({orientation:'landscape'})
    // const tableData = APIData.map((data) => {
    //   return [data.id, data.empid, data.date, data.shift, data.lateentry, data.earlyexit];
    // });
    // doc.autoTable({
    //   head: [['Id', 'Employee Id', 'Date', 'Shift', 'Status', 'Late Entry', 'Early Exit']],
    //   body: tableData,
    // });
    // doc.save("Attendance.pdf");
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Header title="Employee Attendance" subtitle="Employee Attendance List" />
        <Box>
          {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon sx={{ color: colors.blue[900] }} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                style: {
                  color: "#0a1f2e", width: "200px", borderRadius: '15px', border: '1px solid #ccc',
                  backgroundColor: "#fbfbff",
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>Import</MenuItem>
              <MenuItem onClick={exportPdf}>Export</MenuItem>
            </Menu></Box> */}
          <Link to={`/CreateMarkAttendance`}>
            <Button
              sx={{
                backgroundColor: colors.white[100],
                color: colors.blue[900],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px", borderRadius: '15px', boxShadow: '1px 2px 9px #aed7f4'
              }}
            >
              <HowToRegOutlinedIcon sx={{ mr: "10px" }} />

              Mark New     </Button>
          </Link>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
        <div style={{ height: '550px', overflow: 'auto', width: '1180px', backgroundColor: '#f4f5ff' }}>
          <Table singleLine id='my-table'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Employee</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Shift</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Late Entry</Table.HeaderCell>
                <Table.HeaderCell>Early Exit</Table.HeaderCell>
                <Table.HeaderCell>Emergency Exit</Table.HeaderCell>
                <Table.HeaderCell>Update</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {APIData.map((data) => {
                return (

                  <Table.Row>
                    <Table.Cell>{data.businessPartner?.nameWithCode}</Table.Cell>
                    <Table.Cell>{data.date}</Table.Cell>
                    <Table.Cell>{data.paramShift?.paramKey}</Table.Cell>
                    <Table.Cell>{data.paramAttendenceStatus?.paramKey}</Table.Cell>
                    <Table.Cell>{data.isLateEntry ? "Yes" : "No"}</Table.Cell>
                    <Table.Cell>{data.isEarlyExit ? "Yes" : "No"}</Table.Cell>
                    <Table.Cell>{data.isEmergencyExit ? "Yes" : "No"}</Table.Cell>

                    <Link to={`/UpdateMarkAttendance/${data.markAttendanceID}`}>
                      <Table.Cell>
                        <IconButton onClick={() => setData(data)}>
                          <EditIcon sx={{ color: colors.blue[900] }} />
                        </IconButton>{/*
  <Button primary  sx={{
              backgroundColor: colors.white[100],
              color: colors.blue[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", borderRadius:'15px', boxShadow:'1px 2px 9px #aed7f4'
            }}
          onClick={() => setData(data)}>Update</Button>*/}
                      </Table.Cell>
                    </Link>
                    <Table.Cell>
                      <IconButton onClick={() => onDelete(data.markAttendanceID)}>
                        <DeleteIcon sx={{ color: colors.blue[900] }} />
                      </IconButton>{/*
   <Button primary  sx={{
              backgroundColor: colors.white[100],
              color: colors.blue[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", borderRadius:'15px', boxShadow:'1px 2px 9px #aed7f4'
            }}
          onClick={() => onDelete(data.id)}>Delete</Button>*/}
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body></Table></div>
      </Box>
    </Box>
  )
}
export default GetMarkAttendance;
