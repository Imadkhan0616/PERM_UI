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

const GetPermission = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://647e18d4af984710854aee8c.mockapi.io/Permission`)
      .then((response) => {
        console.log(response.data);
        setAPIData(response.data);
      });
  }, []);

  const setData = (data) => {
    let {
      permissionid,
      userid,
      roleID,
      paramAccessType,
      permissionDetails,
      deleted,
      createdby,
      createdon,
    } = data;
    localStorage.setItem("permissionid", permissionid);
    localStorage.setItem("userid", userid);
    localStorage.setItem("roleID", roleID);
    localStorage.setItem("paramAccessType", paramAccessType);
    localStorage.setItem("permissionDetails", permissionDetails);
    localStorage.setItem("deleted", deleted);
    localStorage.setItem("createdby", createdby);
    localStorage.setItem("createdon", createdon);
  };

  const getData = () => {
    axios
      .get(`https://647e18d4af984710854aee8c.mockapi.io/Permission`)
      .then((getData) => {
        setAPIData(getData.data);
      });
  };
  const onDelete = (id) => {
    axios
      .delete(`https://647e18d4af984710854aee8c.mockapi.io/Permission/${id}`)
      .then(() => {
        getData();
      });
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Permission" subtitle="Permissions List" />
        <Box>
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
            href="/CreatePermission"
          >
            Add Permission{" "}
          </Button>
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
                <Table.HeaderCell>Permission ID</Table.HeaderCell>
                <Table.HeaderCell>User Id</Table.HeaderCell>
                <Table.HeaderCell>Role Id</Table.HeaderCell>
                <Table.HeaderCell>Permission Type</Table.HeaderCell>
                <Table.HeaderCell>Permission Details</Table.HeaderCell>
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
                    <Table.Cell>{data.id}</Table.Cell>
                    <Table.Cell>{data.permissionid}</Table.Cell>
                    <Table.Cell>{data.userid}</Table.Cell>
                    <Table.Cell>{data.roleID}</Table.Cell>
                    <Table.Cell>{data.paramAccessType}</Table.Cell>
                    <Table.Cell>{data.permissionDetails}</Table.Cell>
                    <Table.Cell>{data.deleted}</Table.Cell>
                    <Table.Cell>{data.createdby}</Table.Cell>
                    <Table.Cell>{data.createdon}</Table.Cell>

                    <Link to="/UpdatePermission">
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
                      <IconButton onClick={() => onDelete(data.id)}>
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
export default GetPermission;
