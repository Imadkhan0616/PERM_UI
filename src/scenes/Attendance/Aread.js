import React, { useEffect, useState  } from 'react';
import { Table, checkbox } from 'semantic-ui-react'
import axios from 'axios';
import {Box, Button, IconButton, Menu, MenuItem} from "@mui/material";
import Header from '../../components/Header'
import { colors, useTheme } from '@mui/material'
import { tokens } from "../theme";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getAsync, deleteAsync } from '../../helper/axiosHelper';

const Aread=()=> {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [APIData, setAPIData] = useState(null);

  useEffect(() => {
    getData()
  }, []);

  const handleMenuOpen = (event) => {
    setAPIData(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAPIData(null);
  };

  // const [APIData, setAPIData] = useState([]);
  // useEffect(() => {
  //     axios.get(`http://localhost:5072/api/AttendanceRequest`)
  //         .then((response) => {
  //             console.log(response.data)
  //             setAPIData(response.data);
  //         })
  // }, []);

  const setData = (data) => {
    let { attendanceRequestID, fromDate, toDate, halfDay, reason} = data;
      localStorage.setItem('attendanceRequestID', attendanceRequestID);
      localStorage.setItem('fromDate', fromDate);
      localStorage.setItem('toDate', toDate);
      localStorage.setItem('halfDay', halfDay);
      localStorage.setItem('reason', reason);
}

const getData = async () => {
  await getAsync('AttendanceRequest')
    .then((response) => {
      setAPIData(response.data.list);
    });
}
const onDelete = async (id) => {
  await deleteAsync('AttendanceRequest/Delete')
    .then((response) => {
      setAPIData(response.data.list);
    });
}
const exportPdf = async()=>{
  const doc = new jsPDF({orientation:'landscape'})
  
  const tableData = APIData.map((data) => {
    return [data.attendanceRequestID, data.fromDate, data.toDate, data.halfDay, data.reason];
  });
  doc.autoTable({
    head: [['Code', 'From Date', 'To Date', 'To Date', 'Reason']],
    body: tableData,
  });
  doc.save("Attendance.pdf");
};
return (
<Box>          
<Box display="flex" justifyContent="space-between" alignItems="center" >
  <Header title="Employee Attendance" subtitle="Employee Attendance Requests List" />
  <Box>
  <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
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
              color:"#0a1f2e", width:"200px", borderRadius:'15px', border:'1px solid #ccc',
              backgroundColor: "#fbfbff",
            },
          }}
        >
          <MenuItem   onClick={handleMenuClose}>Import</MenuItem>
          <MenuItem   onClick={exportPdf}>Export</MenuItem>
        </Menu></Box>
          <Button 
            sx={{
              backgroundColor: colors.white[100],
              color: colors.blue[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", borderRadius:'15px', boxShadow:'1px 2px 9px #aed7f4'
            }}href='/Acreate'
          >
Create Attendance Request </Button> 
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between"  
      backgroundColor={colors.white[500]} color={colors.blue[900]}>
        <Table 
        singleLine id='my-table'>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Code</Table.HeaderCell>
                    <Table.HeaderCell>From Date</Table.HeaderCell>

                        <Table.HeaderCell>To Date</Table.HeaderCell>
                        <Table.HeaderCell>Half Day</Table.HeaderCell>
                        <Table.HeaderCell>Reason</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
           <Table.Body>
  {APIData.map((data) => {
     return (
      
       <Table.Row>
          <Table.Cell>{data.attendanceRequestID}</Table.Cell>
           <Table.Cell>{data.fromDate}</Table.Cell>
           <Table.Cell>{data.toDate}</Table.Cell>
           <Table.Cell>{data.halfDay}</Table.Cell>
           <Table.Cell>{data.reason}</Table.Cell>
           <Link to='/Aupdate'>
  <Table.Cell> 
  <IconButton  onClick={() => setData(data)}>
        <EditIcon sx={{ color: colors.blue[900] }} />
      </IconButton>{/*
  <Button  sx={{
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
<IconButton  onClick={() => onDelete(data.attendanceRequestID)}>
        <DeleteIcon sx={{ color: colors.blue[900] }} />
      </IconButton>{/*
   <Button  sx={{
              backgroundColor: colors.white[100],
              color: colors.blue[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", borderRadius:'15px', boxShadow:'1px 2px 9px #aed7f4'
            }}
          onClick={() => onDelete(data.id)}>Delete</Button>*/}
   </Table.Cell>
        </Table.Row>
   )})}
</Table.Body></Table>
</Box>
        </Box>
    
    )    }
export default Aread;
