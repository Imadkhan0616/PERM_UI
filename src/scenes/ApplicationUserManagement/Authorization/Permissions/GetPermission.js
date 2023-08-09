import React, { useEffect, useState } from "react";
import { Table, checkbox } from "semantic-ui-react";
import axios from "axios";
import { Box, Button, IconButton } from "@mui/material";
import Header from "../../../../components/Header";
import { colors, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { deleteAsync, getAsync } from "../../../../helper/axiosHelper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';



const GetPermission = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
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

  const getData = async () => {
    await getAsync('Permission')
      .then((response) => {
        setAPIData(response.data.list);
      });
  };
  const onDelete = async (permissionid) => {
    deleteAsync('Permission/Delete', {
      permissionid
    }).then((response) => {
      alert(response.message);
      getData();
    });
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Permission" subtitle="Permissions List" />
        <Box>
          <Link to={`/CreatePermission`}>
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

              Add Permission{" "}
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
                {/* <Table.HeaderCell>Permission Code</Table.HeaderCell>
                <Table.HeaderCell>User Id</Table.HeaderCell> */}
                <Table.HeaderCell>Role</Table.HeaderCell>
                <Table.HeaderCell>Permission</Table.HeaderCell>
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
                    {/* <Table.Cell>{data.permissionid}</Table.Cell>
                    <Table.Cell>{data.userid}</Table.Cell> */}
                    <Table.Cell>{data.role?.name}</Table.Cell>
                    <Table.Cell>{data.paramAccessType?.paramKey}</Table.Cell>
                    <Table.Cell>{data.isDeleted ? "Yes" : "No"}</Table.Cell>
                    <Table.Cell>{data.createdBy}</Table.Cell>
                    <Table.Cell>{data.createdOn}</Table.Cell>

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
