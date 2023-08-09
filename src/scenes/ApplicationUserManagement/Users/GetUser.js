import React, { useEffect, useState } from "react";
import { Table, checkbox } from "semantic-ui-react";
import axios from "axios";
import { Box, Button, IconButton } from "@mui/material";
import Header from "../../../components/Header";
import { colors, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAsync, getAsync } from "../../../helper/axiosHelper";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


const GetUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const setData = (data) => {
    let {
      loginid,
      firstName,
      middleName,
      lastName,
      password,
      isAdmin,
      isActive,
      deleted,
      createdby,
      createdon,
    } = data;
    localStorage.setItem("loginid", loginid);
    localStorage.setItem("FirstName", firstName);
    localStorage.setItem("MiddleName", middleName);
    localStorage.setItem("LastName", lastName);
    localStorage.setItem("Password", password);
    localStorage.setItem("IsAdmin", isAdmin);
    localStorage.setItem("IsActive", isActive);
    localStorage.setItem("deleted", deleted);
    localStorage.setItem("createdby", createdby);
    localStorage.setItem("createdon", createdon);
  };

  const getData = () => {
    getAsync('User')
      .then((response) => {
        console.log(response.data);
        setAPIData(response.data.list);
      });
  };

  const onDelete = (userID) => {
    deleteAsync('User/Delete', {
      userID
    })
      .then((res) => {
        alert(res.message);
        getData();
      });
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="User" subtitle="Users List" />
        <Box>
          <Link to='/CreateUser'>
            <Button
              sx={{
                backgroundColor: colors.white[100],
                color: colors.blue[900],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "15px",
                boxShadow: "1px 2px 9px #aed7f4",
              }}
            >
                          <AddCircleOutlineOutlinedIcon sx={{ mr: "10px" }} />

              Add User{" "}
            </Button>
          </Link>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        backgroundColor={colors.white[500]}
        color={colors.blue[900]}
      >
        <div
          style={{
            height: "550px",
            overflow: "auto",
            width: "1140px",
            backgroundColor: "#f4f5ff",
          }}
        >
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>User ID</Table.HeaderCell>
                <Table.HeaderCell>FirstName</Table.HeaderCell>
                <Table.HeaderCell>MiddleName</Table.HeaderCell>
                <Table.HeaderCell>LastName</Table.HeaderCell>
                <Table.HeaderCell>IsAdmin</Table.HeaderCell>
                <Table.HeaderCell>IsActive</Table.HeaderCell>
                <Table.HeaderCell>Deleted</Table.HeaderCell>
                <Table.HeaderCell>Created by</Table.HeaderCell>
                <Table.HeaderCell>Created on</Table.HeaderCell>
                <Table.HeaderCell>Deleted</Table.HeaderCell>
                <Table.HeaderCell>Update</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {APIData.map((data) => {
                return (
                  <Table.Row>
                    <Table.Cell>{data.userID}</Table.Cell>
                    <Table.Cell>{data.loginID}</Table.Cell>
                    <Table.Cell>{data.firstName}</Table.Cell>
                    <Table.Cell>{data.middleName}</Table.Cell>
                    <Table.Cell>{data.lastName}</Table.Cell>
                    <Table.Cell>{data.isAdmin ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell>{data.isActive ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell>{data.createdBy}</Table.Cell>
                    <Table.Cell>{data.createdOn}</Table.Cell>
                    <Table.Cell>{data.isDeleted ? 'Yes' : 'No'}</Table.Cell>

                    <Link to={`/UpdateUser/${data.userID}`}>
                      <Table.Cell>
                        <IconButton onClick={() => setData(data)}>
                          <EditIcon sx={{ color: colors.blue[900] }} />
                        </IconButton>
                        {/*
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
                      <IconButton onClick={() => onDelete(data.userID)}>
                        <DeleteIcon sx={{ color: colors.blue[900] }} />
                      </IconButton>{" "}
                      {/*      
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
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </Box>
    </Box>
  );
};
export default GetUser;
