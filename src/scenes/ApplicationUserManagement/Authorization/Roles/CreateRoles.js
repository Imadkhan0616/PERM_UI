import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { tokens } from "../../../theme";
import Header from "../../../../components/Header";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { postAsync } from "../../../../helper/axiosHelper";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export default function CreateRoles() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const history = useNavigate();

  const onSubmit = async () => {

    const rolesResponse = await postAsync('Role/Add', {
      name,
      description,
    });

    alert(rolesResponse.message);
    history("/GetRole");
  }

  return (
    <Box m="20px">
      <Header title="Roles" subtitle="Create role" />
      <Box
        display="flex"
        justifyContent="space-between"
        backgroundColor={colors.white[500]}
        color={colors.blue[900]}
      >
        <h4>
          {" "}
          <Box>
            <Link to={`/GetRole`}>
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
                Show roles
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
              placeholder="Enter Name"
              name="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              min="0"
              step="1"
              placeholder="Enter Description"
              name="Description"
              required
              onChange={(e) => setDescription(e.target.value)}
            />

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
