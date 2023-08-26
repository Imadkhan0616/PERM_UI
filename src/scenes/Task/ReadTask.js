import React, { useEffect, useState, useRef } from 'react';
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
import { getAsync, deleteAsync, putAsync } from '../../helper/axiosHelper';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const ReadTask = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // const handleMenuOpen = (event) => {
  //   // setAPIData(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   // setAPIData(null);
  // };


  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    await getAsync('Tasks')
      .then((response) => {
        console.log(response.message);
        setAPIData(response.data.list);
      });
  }

  const onDelete = async (id) => {
    await deleteAsync('Tasks/Delete', {
      'taskID': id.toSting()
    }).then((response) => {
      alert(response.message);
      getData();
    });
  };

  const onMarkAsComplete = async (id) => {
    await putAsync('Tasks/MarkAsDone', {
      'taskID': id
    }).then((response) => {
      alert(response.message);
      getData();
    });
  };

  //const exportPdf = async () => {
  //   const doc = new jsPDF({ orientation: 'landscape' });
  //   const heading = 'Employee Tasks';

  //   const tableData = APIData.map((data) => {
  //     return [
  //       data.id,
  //       data.code,
  //       data.taskType,
  //       data.taskPriority,
  //       data.taskName,
  //       data.status,
  //       data.deadline,
  //       data.taskDescription,
  //       data.targerCompletionDate,
  //       data.assignedTo,
  //       data.assignedBy,
  //     ];
  //   });
  //   doc.autoTable({
  //     head:[[
  //     'Id',
  //     'Code',
  //     'Task Type',
  //     'Task Priority',
  //     'Task Name',
  //     'Status',
  //     'Deadline',
  //     'Description',
  //     'Target Completion Date',
  //     'Assigned To',
  //     'Assigned By',
  //   ]],
  //   body: tableData,
  // });
  //   doc.save('Task.pdf');
  //};

  return (
    <Box m="20px"  >
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Header title="Employee Tasks" subtitle="Employee Task List" />
        <Box>
          <Link to={`/CreateTask`}>
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

              Create Task   </Button>
          </Link>
        </Box>


      </Box>
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[500]} color={colors.blue[900]}>

        <Table singleLine id='my-table'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>S.No</Table.HeaderCell>
              <Table.HeaderCell>Code</Table.HeaderCell>
              <Table.HeaderCell>Task Type</Table.HeaderCell>
              <Table.HeaderCell>Task Priority</Table.HeaderCell>
              <Table.HeaderCell>Task Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Deadline</Table.HeaderCell>
              <Table.HeaderCell>Task Description</Table.HeaderCell>
              <Table.HeaderCell>Is Active</Table.HeaderCell>
              <Table.HeaderCell>Target Completion Date</Table.HeaderCell>
              <Table.HeaderCell>Assigned To</Table.HeaderCell>
              <Table.HeaderCell>Assigned By</Table.HeaderCell>
              <Table.HeaderCell>Update</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {APIData.map((data, index) => {
              return (
                <Table.Row>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{data.code}</Table.Cell>
                  <Table.Cell>{data.paramTaskType?.paramKey}</Table.Cell>
                  <Table.Cell>{data.paramTaskPriority?.paramKey}</Table.Cell>
                  <Table.Cell>{data.taskName}</Table.Cell>
                  <Table.Cell>{data.paramTaskStatus?.paramKey}</Table.Cell>
                  <Table.Cell>{data.deadline}</Table.Cell>
                  <Table.Cell>{data.taskDescription}</Table.Cell>
                  <Table.Cell>{data.isActive ? "Yes" : "No"}</Table.Cell>
                  <Table.Cell>{data.targetCompletionDate}</Table.Cell>
                  <Table.Cell>{data.assignedTo && data.assignedTo?.firstName + " " + data.assignedTo?.lastName}</Table.Cell>
                  <Table.Cell>{data.assignedBy && data.assignedBy?.firstName + " " + data.assignedTo?.lastName}</Table.Cell>
                  <Link to={`/UpdateTask/${data.taskID}`}>
                    <Table.Cell>
                      <IconButton>
                        <EditIcon sx={{ color: colors.blue[900] }} />
                      </IconButton>
                    </Table.Cell>
                  </Link>
                  <Table.Cell>
                    <IconButton onClick={() => onDelete(data.taskID)}>
                      <DeleteIcon sx={{ color: colors.blue[900] }} />
                    </IconButton>

                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => onMarkAsComplete(data.taskID)}
                      sx={{
                        backgroundColor: colors.primary,
                        color: colors.blue[900],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px", borderRadius: '15px', boxShadow: '1px 2px 9px #aed7f4'
                      }}
                    >
                      <CheckCircleOutlineOutlinedIcon sx={{ mr: "10px" }} />

                      Mark as done
                    </Button>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body></Table>
      </Box>
    </Box>
  )
}
export default ReadTask;
