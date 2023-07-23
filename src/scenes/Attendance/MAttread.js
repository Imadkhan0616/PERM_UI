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

const MAttread=()=> {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
      axios.get(`https://64665758ba7110b6639e57a4.mockapi.io/api/attendance/AttendanceMark`)
          .then((response) => {
              console.log(response.data)
              setAPIData(response.data);
          })
  }, []);

  const setData = (data) => {
    let { id, empid, date, checkbox, shift, lateentry, earlyexit } = data;
      localStorage.setItem('id', id);
      localStorage.setItem('empid', empid);
      localStorage.setItem('date', date);
      localStorage.setItem('checkbox', checkbox);
      localStorage.setItem('shift', shift);
      localStorage.setItem('lateentry', lateentry);
      localStorage.setItem('earlyexit', earlyexit);
}

const getData = () => {
  axios.get(`https://64665758ba7110b6639e57a4.mockapi.io/api/attendance/AttendanceMark`)
      .then((getData) => {
          setAPIData(getData.data);
      })
}
const onDelete = (id) => {
  axios.delete(`https://64665758ba7110b6639e57a4.mockapi.io/api/attendance/AttendanceMark/${id}`)
  .then(() => {
      getData();
  })
}
const exportPdf = async()=>{
  const doc = new jsPDF({orientation:'landscape'})
  const tableData = APIData.map((data) => {
    return [data.id, data.empid, data.date, data.shift, data.lateentry, data.earlyexit];
  });
  doc.autoTable({
    head: [['Id', 'Employee Id', 'Date', 'Shift', 'Status', 'Late Entry', 'Early Exit']],
    body: tableData,
  });
  doc.save("Attendance.pdf");
};
    return (
        <Box>  
        <Box display="flex" justifyContent="space-between" alignItems="center" >
           <Header title="Employee Attendance" subtitle="Employee Attendance List" />
           <Box>
           <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
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
            }}href='/MAttcreate'
          >
Mark New     </Button> 
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between"  
      backgroundColor={colors.white[500]} color={colors.blue[900]}>
      <div style={{ height: '550px', overflow: 'auto', width:'1180px', backgroundColor: '#f4f5ff'}}>    
        <Table singleLine id='my-table'>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Employee Id</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Shift</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Late Entry</Table.HeaderCell>
                        <Table.HeaderCell>Early Exit</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
           <Table.Body>
  {APIData.map((data) => {
     return (
      
       <Table.Row>
          <Table.Cell>{data.id}</Table.Cell>
           <Table.Cell>{data.empid}</Table.Cell>
           <Table.Cell>{data.date}</Table.Cell>
           <Table.Cell>{data.shift}</Table.Cell>
           <Table.Cell>{data.status}</Table.Cell>
           <Table.Cell>{data.lateentry}</Table.Cell>
           <Table.Cell>{data.earlyexit}</Table.Cell>

           <Link to='/MAttupdate'>
  <Table.Cell> 
  <IconButton  onClick={() => setData(data)}>
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
<IconButton  onClick={() => onDelete(data.id)}>
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
   )})}
</Table.Body></Table></div>
</Box>
        </Box>
    )
}
export default MAttread;
