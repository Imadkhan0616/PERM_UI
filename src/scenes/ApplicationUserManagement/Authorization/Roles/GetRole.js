import React, { useEffect, useState } from "react";
import { Table, checkbox } from "semantic-ui-react";
import axios from "axios";
import { Box, Button, IconButton } from "@mui/material";
import Header from "../../../../components/Header";
import { colors, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAsync, getAsync } from "../../../../helper/axiosHelper";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


const GetRole = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const setData = (data) => {
    let {
      roleid,
      description,
      deleted,
      createdby,
      createdon,
    } = data;
    localStorage.setItem("Roleid", roleid);
    localStorage.setItem("Description", description);
    localStorage.setItem("deleted", deleted);
    localStorage.setItem("createdby", createdby);
    localStorage.setItem("createdon", createdon);
  };

  const getData = async () => {
    await getAsync('Role')
      .then((response) => {
        setAPIData(response.data.list);
      });
  };

  const onDelete = async (roleID) => {
    deleteAsync('Role/Delete', {
      roleID
    }).then((response) => {
      alert(response.message);
      getData();
    });
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Role" subtitle="Roles List" />
        <Box>
          <Link to={`/CreateRoles`}>
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

              Add Role{" "}
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
            width: "100%",
            backgroundColor: "#f4f5ff",
          }}
        >
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Role ID</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
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
                    <Table.Cell>{data.roleID}</Table.Cell>
                    <Table.Cell>{data.name}</Table.Cell>
                    <Table.Cell>{data.description}</Table.Cell>
                    <Table.Cell>{data.isDeleted ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell>{data.createdBy}</Table.Cell>
                    <Table.Cell>{data.createdOn}</Table.Cell>

                    <Link to={`/UpdateRoles/${data.roleID}`}>
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
                      <IconButton onClick={() => onDelete(data.roleID)}>
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
export default GetRole;
