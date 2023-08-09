import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { tokens } from "../../theme";
import Header from "../../../components/Header";
import { useNavigate } from "react-router";
import { Box, useTheme } from "@mui/material";
import { postAsync } from "../../../helper/axiosHelper";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Link } from "react-router-dom";
import SelectInput from "../../../components/Select/SelectInput";

export default function CreateUser() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loginID, setLoginID] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState("");
    const [isActive, setIsActive] = useState("");
    const [selectedRole, setSelectedRole] = useState([]);

    const history = useNavigate();

    const onSubmit = async () => {

        let userRole;

        if (selectedRole.length != 0) {
            userRole = selectedRole.map((item) => ({
                roleID: item.value
            }));
        }

        const UserResponse = await postAsync('User/Add', {
            loginID,
            firstName,
            middleName,
            lastName,
            password,
            isAdmin,
            isActive,
            userRole
        });

        alert(UserResponse.message);
        history('/GetUser');
    };

    const handleOnSelectChange = (selectedValue) => {
        console.log(selectedValue);
        setSelectedRole(selectedValue);
    };

    return (
        <Box m="20px">
            <Header title="User" subtitle="Create User" />
            <Box
                display="flex"
                justifyContent="space-between"
                backgroundColor={colors.white[500]}
                color={colors.blue[900]}
            >
                <h4>
                    {" "}
                    <Box>
                        <Link to='/GetUser'>
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
                                <VisibilityOutlinedIcon sx={{ mr: "10px" }} />
                                Show User
                            </Button>
                        </Link>
                    </Box>{" "}
                    <br></br>
                </h4>
            </Box>
            <Box
                display="flex"
                justifyContent="space-between"
                backgroundColor={colors.white[500]}
                color={colors.blue[900]}
            >
                <Form className="create-form">
                    <div className="mb-3">

                        <input
                            type="text"
                            min="0"
                            step="1"
                            placeholder="Enter Login ID"
                            name="loginID"
                            required
                            onChange={(e) => setLoginID(e.target.value)}
                        />

                        <input
                            type="text"
                            min="0"
                            step="1"
                            placeholder="Enter Firstname"
                            name="Firstname"
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <input
                            type="text"
                            min="0"
                            step="1"
                            placeholder="Enter Middlename"
                            name="Middlename"
                            required
                            onChange={(e) => setMiddleName(e.target.value)}
                        />
                        <input
                            type="text"
                            min="0"
                            step="1"
                            placeholder="Enter Lastname"
                            name="Lastname"
                            required
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <input
                            type="password"
                            min="0"
                            step="1"
                            placeholder="Enter Password"
                            name="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br></br>
                        <label for="checkbox">Admin</label>
                        <input
                            type="checkbox"
                            name="isAdmin"
                            required
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />

                        <label for="checkbox">Active</label>
                        <input
                            type="checkbox"
                            name="isActive"
                            required
                            onChange={(e) => setIsActive(e.target.checked)}
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

                    <Button
                        type="submit"
                        color="#0a1f2e"
                        className="btn-primary"
                        onClick={onSubmit}
                    >
                        Submit
                    </Button>
                </Form>
            </Box>
        </Box>
    );
}
