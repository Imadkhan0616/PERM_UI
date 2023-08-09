import React, { useEffect, useState } from 'react';
import { Table, checkbox } from 'semantic-ui-react'
import axios from 'axios';
import { Box, Button, IconButton } from "@mui/material";
import Header from '../../components/Header'
import { colors, useTheme } from '@mui/material'
import { tokens } from "../theme";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAsync, deleteAsync } from '../../helper/axiosHelper';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


const GetEmployeeMasterData = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData()
  }, []);

  const setData = (data) => {
    // let {
    //   businessPartnerID,
    //   code,
    //   firstName,
    //   middleName,
    //   lastName,
    //   isActive,
    //   gender } = data;
    // localStorage.setItem('BusinessPartnerID', businessPartnerID);
    // localStorage.setItem('Code', code);
    // localStorage.setItem('FirstName', firstName);
    // localStorage.setItem('MiddleName', middleName);
    // localStorage.setItem('LastName', lastName);
    // localStorage.setItem('IsActive', isActive);
    // localStorage.setItem('Gender', gender);
  }

  const getData = async () => {
    await getAsync('BusinessPartner')
      .then((response) => {
        console.log(response.message);
        setAPIData(response.data.list);
      });
  }
  const onDelete = async (id) => {
   await deleteAsync('BusinessPartner/Delete', {
      'BusinessPartnerID': id.toString()
    }).then((response) => {
        alert(response.message);
        setAPIData(response.data.list);
      });
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Header title="Employee MasterData" subtitle="Employee Master Data" />
        <Box>
          <Link to={`/CreateEmployeeMasterData`}>
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

              Create Employee
            </Button>
          </Link>

        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Code</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Middle Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>IsActive</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              <Table.HeaderCell>Department</Table.HeaderCell>
              <Table.HeaderCell>Level</Table.HeaderCell>
              <Table.HeaderCell>Update</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {APIData.map((data) => {
              return (
                <Table.Row>
                  <Table.Cell>{data.code}</Table.Cell>
                  <Table.Cell>{data.firstName}</Table.Cell>
                  <Table.Cell>{data.middleName}</Table.Cell>
                  <Table.Cell>{data.lastName}</Table.Cell>
                  <Table.Cell>{data.isActive ? "Yes" : "No"}</Table.Cell>
                  <Table.Cell>{data.paramGender?.paramKey}</Table.Cell>
                  <Table.Cell>{data.department?.name}</Table.Cell>
                  <Table.Cell>{data.paramLevel?.paramKey}</Table.Cell>
                  <Link to={`/UpdateEmployeeMasterData/${data.businessPartnerID}`}>
                    <Table.Cell>
                      <IconButton onClick={() => setData(data)}>
                        <EditIcon sx={{ color: colors.blue[900] }} />
                      </IconButton>
                    </Table.Cell>
                  </Link>
                  {/*
  <Button sx={{
              backgroundColor: colors.white[100],
              color: colors.blue[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", borderRadius:'15px', boxShadow:'1px 2px 9px #aed7f4'
            }}
          onClick={() => setData(data)}>Update</Button>*/}

                  <Table.Cell>
                    <IconButton onClick={() => onDelete(data.businessPartnerID)}>
                      <DeleteIcon sx={{ color: colors.blue[900] }} />
                    </IconButton>{" "}
                    {/*
   <Button sx={{
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
      </Box>
    </Box>
  )
}
export default GetEmployeeMasterData;
