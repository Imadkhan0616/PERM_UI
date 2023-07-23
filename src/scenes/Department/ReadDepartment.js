import React, { useEffect, useState } from 'react';
import { Table, checkbox } from 'semantic-ui-react'
import axios from 'axios';
import { Box, Button, IconButton } from "@mui/material";
import Header from '../../components/Header'
import { colors, useTheme } from '@mui/material'
import { tokens } from "../theme";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteAsync, getAsync } from '../../helper/axiosHelper';
const ReadDepartment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    getData()
  }, []);

  const setData = (data) => {
    // let { departmentid, name, code, deleted, createdby, createdon } = data;
    // localStorage.setItem('departmentid', departmentid);
    // localStorage.setItem('name', name);
    // localStorage.setItem('code', code);
    // localStorage.setItem('deleted', deleted);
    // localStorage.setItem('createdby', createdby);
    // localStorage.setItem('createdon', createdon);
  }

  const getData = async () => {
    await getAsync('Department')
      .then((response) => {
        setAPIData(response.data.list);
      });
  }
  const onDelete = async (id) => {
    await deleteAsync('Department/Delete', { 'DepartmentID': id.toString() })
      .then((response) => {
        alert(response.message);
        setAPIData(response.data.list);
      });
  }
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Header title="Departments" subtitle="Departments List" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.white[100],
              color: colors.blue[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", borderRadius: '15px', boxShadow: '1px 2px 9px #aed7f4'
            }} href='/CDepartment'
          >
            Add Department   </Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Department Id</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Code</Table.HeaderCell>
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
                  <Table.Cell>{data.departmentID}</Table.Cell>
                  <Table.Cell>{data.name}</Table.Cell>
                  <Table.Cell>{data.code}</Table.Cell>
                  <Table.Cell>{data.deleted}</Table.Cell>
                  <Table.Cell>{data.createdby}</Table.Cell>
                  <Table.Cell>{data.createdon}</Table.Cell>

                  <Link to={`/UpdateDepartment/${data.departmentID}`}>
                    <Table.Cell>
                      <IconButton onClick={() => setData(data)}>
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
                    <IconButton onClick={() => onDelete(data.departmentID)}>
                      <DeleteIcon sx={{ color: colors.blue[900] }} />
                    </IconButton>  {/*      
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
              )
            })}
          </Table.Body></Table>
      </Box></Box>
  )
}
export default ReadDepartment;
