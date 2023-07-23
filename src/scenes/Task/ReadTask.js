import React, { useEffect, useState, useRef  } from 'react';
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
import { getAsync ,deleteAsync } from '../../helper/axiosHelper';

const ReadTask=()=> {
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
     getData()
  }, []);

  const setData = (data) => {
    let { id, code,taskType,taskPriority,taskName, taskDescription,status, deadline, targerCompletionDate,assignedTo, assignedBy } = data;
      localStorage.setItem('TaskID', id);
      localStorage.setItem('Code', code);
      localStorage.setItem('ParamTaskTypeID', taskType);
      localStorage.setItem('ParamTaskPriorityID', taskPriority);
      localStorage.setItem('TaskName', taskName);
      localStorage.setItem('IsActive', status);
      localStorage.setItem('Deadline', deadline);
      localStorage.setItem('TaskDescription', taskDescription);
      localStorage.setItem('TargetCompletionDate', targerCompletionDate);
      localStorage.setItem('AssignedToID', assignedTo);
      localStorage.setItem('AssignedBy', assignedBy);
}

const getData = async () => {
  await getAsync('Tasks')
  .then((response) => {
          setAPIData(response.data.list);
      })
}
const onDelete = async (id) => {
  await deleteAsync('Tasks/Delete')
  .then((response) => {
      setAPIData(response.data.list);
  })
}
const exportPdf = async () => {
  const doc = new jsPDF({ orientation: 'landscape' });
  const heading = 'Employee Tasks';

  const tableData = APIData.map((data) => {
    return [
      data.id,
      data.code,
      data.taskType,
      data.taskPriority,
      data.taskName,
      data.status,
      data.deadline,
      data.taskDescription,
      data.targerCompletionDate,
      data.assignedTo,
      data.assignedBy,
    ];
  });
  doc.autoTable({
    head:[[
    'Id',
    'Code',
    'Task Type',
    'Task Priority',
    'Task Name',
    'Status',
    'Deadline',
    'Description',
    'Target Completion Date',
    'Assigned To',
    'Assigned By',
  ]],
  body: tableData,
});
  doc.save('Task.pdf');
};

    return (
        <Box m="20px"  >
         <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Header title="Employee Tasks" subtitle="Employee Task List" />
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
            }}href='/CreateTask'
          >
Create Task    </Button> 
        </Box>
      </Box>
      
      <Box display="flex" justifyContent="space-between"  
      backgroundColor={colors.white[500]} color={colors.blue[900]}>

        <Table singleLine id='my-table'>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Code</Table.HeaderCell>
                    <Table.HeaderCell>Task Type</Table.HeaderCell>
                    <Table.HeaderCell>Task Priority</Table.HeaderCell>
                    <Table.HeaderCell>Task Name</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Deadline</Table.HeaderCell>
                    <Table.HeaderCell>Task Description</Table.HeaderCell>
                    <Table.HeaderCell>Target Completion Date</Table.HeaderCell>
                    <Table.HeaderCell>Assigned To</Table.HeaderCell>
                    <Table.HeaderCell>Assigned By</Table.HeaderCell>
                    <Table.HeaderCell>Update</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
           <Table.Body>
  {APIData.map((data) => {
     return (
      
       <Table.Row>
          <Table.Cell>{data.id}</Table.Cell>
           <Table.Cell>{data.code}</Table.Cell>
           <Table.Cell>{data.taskType}</Table.Cell>
           <Table.Cell>{data.taskPriority}</Table.Cell>
           <Table.Cell>{data.taskName}</Table.Cell>
           <Table.Cell>{data.status}</Table.Cell>
           <Table.Cell>{data.deadline}</Table.Cell>
           <Table.Cell>{data.taskDescription}</Table.Cell>
           <Table.Cell>{data.targerCompletionDate}</Table.Cell>
           <Table.Cell>{data.assignedTo}</Table.Cell>
           <Table.Cell>{data.assignedBy}</Table.Cell>

           <Link to='/UpdateTask'>
  <Table.Cell> 
  <IconButton  onClick={() => setData(data)}>
        <EditIcon sx={{ color: colors.blue[900] }} />
      </IconButton>{/*
  <Button 
   sx={{
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
</Box></Box>
    )
}
export default ReadTask;
