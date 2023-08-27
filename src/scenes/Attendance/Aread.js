import React, { useEffect, useState } from 'react';
import { Table, checkbox } from 'semantic-ui-react'
import axios from 'axios';
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import Header from '../../components/Header'
import { colors, useTheme } from '@mui/material'
import { tokens } from "../theme";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getAsync, deleteAsync } from '../../helper/axiosHelper';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


const Aread = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // const handleMenuOpen = (event) => {
  //   setAPIData(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAPIData(null);
  // };

  // const [APIData, setAPIData] = useState([]);
  // useEffect(() => {
  //     axios.get(`http://localhost:5072/api/AttendanceRequest`)
  //         .then((response) => {
  //             console.log(response.data)
  //             setAPIData(response.data);
  //         })
  // }, []);

  const setData = (data) => {
    let { 
      attendanceRequestID,
      businessPartnerID,
      fromDate,
      toDate,
      halfDay,
      reason,
      deleted,
      createdby,
      createdon,
           } = data;
    localStorage.setItem('attendanceRequestID', attendanceRequestID);
    localStorage.setItem('businessPartnerID', businessPartnerID);
    localStorage.setItem('fromDate', fromDate);
    localStorage.setItem('toDate', toDate);
    localStorage.setItem('halfDay', halfDay);
    localStorage.setItem('reason', reason);
    localStorage.setItem("deleted", deleted);
    localStorage.setItem("createdby", createdby);
    localStorage.setItem("createdon", createdon);
  };

  const getData = async () => {
    await getAsync('AttendanceRequest')
      .then((response) => {
        setAPIData(response.data.list);
      });
  };

  const onDelete = async (attendanceRequestID) => {
     deleteAsync('AttendanceRequest/Delete', {
      attendanceRequestID
    }).then((response) => {
        alert(response.message);
        getData();
      });
  };
  const exportPdf = async () => {
    // const doc = new jsPDF({ orientation: 'landscape' })

    // const tableData = APIData.map((data) => {
    //   return [data.attendanceRequestID, data.fromDate, data.toDate, data.halfDay, data.reason];
    // });
    // doc.autoTable({
    //   head: [['Code', 'From Date', 'To Date', 'To Date', 'Reason']],
    //   body: tableData,
    // });
    // doc.save("Attendance.pdf");
  };
  return (
    <Box  m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Header title="Employee Attendance" subtitle="Employee Attendance Requests List" />
        <Box>
          {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon sx={{ color: colors.blue[900] }} />
            </IconButton>

            <Menu
              anchorEl={APIData}
              open={Boolean(APIData)}
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
            <Link to={`/Acreate`}>
          <Button
            sx={{
              backgroundColor: colors.white[100],
              color: colors.blue[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", borderRadius: '15px', boxShadow: '1px 2px 9px #aed7f4'
            }}
          >
                        <AddCircleOutlineOutlinedIcon sx={{ mr: "10px" }} />

            Create Attendance Request </Button>
            </Link>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
          <div style={{
            height: "550px",
            overflow: "auto",
            width: "100%",
            backgroundColor: "#f4f5ff",
          }}>
        <Table
          singleLine id='my-table'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Employee </Table.HeaderCell>
              <Table.HeaderCell>From Date</Table.HeaderCell>
              <Table.HeaderCell>To Date</Table.HeaderCell>
              <Table.HeaderCell>Half Day</Table.HeaderCell>
              <Table.HeaderCell>Reason</Table.HeaderCell>
              <Table.HeaderCell>Deleted</Table.HeaderCell>
                <Table.HeaderCell>Created by</Table.HeaderCell>
                <Table.HeaderCell>Created on</Table.HeaderCell>
              <Table.HeaderCell>Update</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {APIData.map((data) => {
              return (

                <Table.Row>
                  <Table.Cell>{data.businessPartnerID}</Table.Cell>
                  <Table.Cell>{data.fromDate}</Table.Cell>
                  <Table.Cell>{data.toDate}</Table.Cell>
                  <Table.Cell>{data.halfDay}</Table.Cell>
                  <Table.Cell>{data.reason}</Table.Cell>
                  <Table.Cell>{data.isDeleted ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell>{data.createdBy}</Table.Cell>
                    <Table.Cell>{data.createdOn}</Table.Cell>
                   <Link to={`/AUpdate/${data.attendanceRequestID}`}>
                    <Table.Cell>
                      <IconButton onClick={() => setData(data)}>
                        <EditIcon sx={{ color: colors.blue[900] }} />
                      </IconButton>
                    </Table.Cell>
                  </Link>
                  <Table.Cell>
                    <IconButton onClick={() => onDelete(data.attendanceRequestID)}>
                      <DeleteIcon sx={{ color: colors.blue[900] }} />
                    </IconButton>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body></Table>
          </div>
      </Box>
    </Box>

  )
}
export default Aread;
