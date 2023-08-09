import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import { colors, useTheme } from '@mui/material'
import { tokens } from "../../theme";
import Header from "../../../components/Header";
import { Button, Form, Checkbox } from 'semantic-ui-react'
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { putAsync, getAsync } from "../../../helper/axiosHelper";
import SelectInput from "../../../components/Select/SelectInput";
import EditIcon from "@mui/icons-material/Edit";


export default function UpdateUser() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { id } = useParams();
    let navigate = useNavigate();

    const [loginID, setLoginID] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState("");
    const [isActive, setIsActive] = useState("");
    const [selectedRole, setSelectedRole] = useState([]);

    const fetchData = async () => {
        const userResponse = await getAsync('User', { 'SearchColumn': 'UserID', 'SearchValue': id.toString() })
            .catch((error) => {
                console.error('Error fetching users data:', error);
            });

        const user = userResponse.data.list[0];
        console.log(user);
        setLoginID(user.loginID);
        setFirstName(user.firstName);
        setMiddleName(user.middleName);
        setLastName(user.lastName);
        setIsAdmin(user.isAdmin);
        setIsActive(user.isActive);

        console.log(user.userRole);

        if (user.userRole !== null && user.userRole.length != 0) {
            setSelectedRole(user.userRole.map((item) => ({
                value: item.roleID,
                label: item.role?.name
            })));

            console.log(selectedRole);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOnSelectChange = (selectedValue) => {
        console.log(selectedValue);
        setSelectedRole(selectedValue);
    };

    const onSubmit = () => {
        if (!setLoginID) {
            alert('Please enter the Login ID.');
            return;
        }

        let userRole = [];

        if (selectedRole.length != 0) {
            userRole = selectedRole.map((item) => ({
                roleID: item.roleID
            }));
        }

        putAsync('User/Update', {
            userID: id,
            loginID,
            firstName,
            middleName,
            lastName,
            password,
            isAdmin,
            isActive,
            userRole
        }).then((res) => {
            alert(res.message);
            navigate('/GetUser')
        })
    };

    return (
        <Box m="20px">
            <Header title="Users" subtitle="Create User" />
            <Box display="flex" justifyContent="space-between"
                backgroundColor={colors.white[500]} color={colors.blue[900]}>
                <h4> <Box>
                    
                    <Link to='/GetUser'>
                        <Button
                            sx={{
                                backgroundColor: colors.white[100],
                                color: colors.blue[900],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px", borderRadius: '15px', boxShadow: '1px 2px 9px #aed7f4'
                            }}
                            href='/GetUser'
                        >
                            <VisibilityOutlinedIcon sx={{ mr: "10px" }} />
                            Show User
                        </Button>
                    </Link>
                </Box> 
                <br></br>
                </h4>
            </Box>
            <Box display="flex" justifyContent="space-between"
                backgroundColor={colors.white[100]} color={colors.blue[900]}  >
                <div style={{ height: '550px', overflow: 'auto', width: '1130px', backgroundColor: '#f4f5ff' }}>

                    <Form className="create-form">
                        <div className="mb-3">
                            <input
                                disabled
                                type="text"
                                placeholder="Enter Login ID"
                                name="loginID"
                                required
                                value={loginID}
                                onChange={(e) => setLoginID(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Enter Firstname"
                                name="Firstname"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Enter Middlename"
                                name="Middlename"
                                required
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Enter Lastname"
                                name="Lastname"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />

                            <label for="checkbox">Admin</label>
                            <input
                                type="checkbox"
                                name="isAdmin"
                                checked={isAdmin}
                                required
                                onChange={(e) => setIsAdmin(e.target.value)}
                            />

                            <label for="checkbox">Active</label>
                            <input
                                type="checkbox"
                                name="isActive"
                                required
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.value)}
                            />
                            <br></br>
                            <label for="checkbox">Roles</label>
                            <SelectInput
                                isMultiSelect={true}
                                selectedOption={selectedRole}
                                onValueChange={handleOnSelectChange}
                                placeholde="Select Role"
                                apiUrl="Role"
                                valueField="roleID"
                                lableField="name" />
                        </div>
                        <Link to={`/GetUser`}>
                        <Button
                            type="submit" onClick={onSubmit}
                        >
                            <EditIcon sx={{ mr: "10px" }} />

                            Update</Button>
                        </Link>

                    </Form></div>

            </Box>
        </Box>
    )
}
