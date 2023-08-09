import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import Header from "../../../../components/Header";
import { useNavigate } from "react-router";
import { Box, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import SelectInput from "../../../../components/Select/SelectInput";
import { getAsync, postAsync } from "../../../../helper/axiosHelper";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DownloadDoneOutlinedIcon from '@mui/icons-material/DownloadDoneOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

export default function CreatePermissions() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showDiv, setShowDiv] = useState(false);
  const [permissionid, setPermissionId] = useState("");
  const [userid, setUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [permissionDetail, setPermissionDetail] = useState([]);
  const [pageOptionData, setPageOptionData] = useState([]);
  const [allowedPageOptionData, setAllowedPageOptionData] = useState([]);
  const [paramAccessType, setParamAccessType] = useState("");
  const [permissionDetails, setPermissionDetails] = useState("");
  const [isdeleted, setIsdeleted] = useState("");
  const [createdby, setCreatedby] = useState("");
  const [createdon, setCreatedOn] = useState("");

  const history = useNavigate();

  const onSubmit = async () => {

    const uniqueItems = allowedPageOptionData.reduce((prevItem, currentItem) => {
      if (!prevItem.some((i) => i.pageOptionID === currentItem.pageOptionID)) {
        prevItem.push(currentItem);
      }
      return prevItem;
    }, []);

    const pageOptionPermissions = uniqueItems.map((item) => ({
      pageOptionID: item.pageOptionID,
      paramAccessTypeID: 4
    }));

    const permissionResponse = await postAsync('Permission/Add', {
      roleID: selectedRole?.value,
      paramAccessTypeID: 4,
      permissionDetail: pageOptionPermissions
    });

    alert(permissionResponse.message);
  };

  const handleSpecifyPermission = () => {
    setShowDiv(!showDiv);
  };

  const handleRoleChange = (selectedValue) => {
    setSelectedRole(selectedValue);
  };

  const handleMenuChange = async (selectedValue) => {
    setSelectedMenu(selectedValue);

    // load menu => page options
    let pageOptionResponse = await getAsync('PageOption', { 'SearchColumn': 'MenuID', 'SearchValue': selectedValue.value.toString() });

    const mappedPageOptions = pageOptionResponse.data.list.map((item) => ({
      pageOptionID: item.pageOptionID,
      name: item.name,
      key: item.key,
      placementArea: item.placementArea,
      isStandard: item.isStandard,
      displayOrder: item.displayOrder,
      isAllowed: false,
    }));

    setPageOptionData(mappedPageOptions);
  };

  const handleOptionPermissionChange = (event, pageOptionPermission) => {
    setPageOptionData(prevData => {
      return prevData.map(item => {
        if (item.pageOptionID === pageOptionPermission.pageOptionID) {
          return { ...item, isAllowed: !item.isAllowed };
        }
        return item;
      });
    });
  };

  const handleSetPermission = () => {
    const allowedItems = pageOptionData.filter((item) => item.isAllowed);
    setAllowedPageOptionData((prevData) => [...prevData, ...allowedItems]);
  };

  return (
    <Box m="20px">
      <Header title="Permission" subtitle="Create Permission" />
      <Box
        display="flex"
        justifyContent="space-between"
        backgroundColor={colors.white[500]}
        color={colors.blue[900]}
      >
        <Form className="create-form">
          <div className="mb-3">
            <label for="text">Role </label>
            <SelectInput placeholde="Select Role" apiUrl="Role" valueField="roleID" lableField="name" selectedOption={selectedRole} onValueChange={handleRoleChange} />
          </div>
          <Box
            display="flex"
            justifyContent="space-between"
            backgroundColor={colors.white[500]}
            color={colors.blue[900]}
          >
            <h4>
              {" "}
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
                  onClick={handleSpecifyPermission}
                >
                  <ArrowDropDownCircleOutlinedIcon sx={{ mr: "10px" }} />
                  Specify Permissions
                </Button>
              </Box>{" "}
              <br></br>
            </h4>
          </Box>
          {showDiv &&
            <div className="mb-3">
              <label for="text">Menu </label>
              <SelectInput placeholde="Select Menu" apiUrl="Menu" valueField="menuID" lableField="name" selectedOption={selectedMenu} onValueChange={handleMenuChange} />
              <br></br>
              {pageOptionData.length != 0 &&
                <>
                  <Button
                    type="submit"
                    color="#0a1f2e"
                    className="btn-primary"
                    onClick={handleSetPermission}
                  >
                  <AdminPanelSettingsOutlinedIcon sx={{ mr: "10px" }} />

                    Set Permission
                  </Button>
                  <br></br>
                  <table className="table-stripped table-bordered">
                    <thead>
                      <tr>
                        <th>S. No</th>
                        <th>Option Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        pageOptionData.map((pageOption, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{pageOption.name}</td>
                              <td><input
                                type="checkbox"
                                checked={pageOption.isAllowed}
                                onChange={(event) => handleOptionPermissionChange(event, pageOption)}
                              /></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </>
              }
              <br></br>
            </div>}
            <Link to={`/GetPermission`}>
          <Button
            type="submit"
            color="#0a1f2e"
            className="btn-primary"
            onClick={onSubmit}
          >
                  <DownloadDoneOutlinedIcon sx={{ mr: "10px" }} />
            Submit
          </Button>
          </Link>
        </Form>
      </Box>
    </Box>
  );
}
