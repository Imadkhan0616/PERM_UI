import {Box,Typography, useTheme} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import  AdminPanelSettingsOutlinedIcon  from "@mui/icons-material/AdminPanelSettingsOutlined";
import  LockOpenOutlinedIcon  from "@mui/icons-material/LockOpenOutlined";
import  SecurityOutlinedIcon  from "@mui/icons-material/SecurityOutlined";
import Header from "./Header";
import { tokens } from "../scenes/theme";
import { mockDataUserRoles } from "../data/mockData";


const UserRole =()=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const columns =[
        { field: "id", headerName:"User Id" },
        { field:"Uname", headerName:"User Name", flex:1, cellClassName:"name--column-cell"},
        { field:"Rname", headerName:"Role Name", flex:1},
        { field:"Createdon", headerName:"Created On", flex:1},
        { field:"deleted", headerName:"Is deleted", flex:1},
        { field:"Createdby", headerName:"Created by", flex:1},
        {
            field: "accessLevel",
            headerName: "Access Level",
            flex: 1,
            renderCell: ({ row: { access } }) => {
              return (
                <Box
                  width="60%"
                  m="0 auto"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  backgroundColor={
                    access === "admin"
                      ? colors.greenAccent[600]
                      : access === "manager"
                      ? colors.greenAccent[700]
                      : colors.greenAccent[700]
                  }
                  borderRadius="4px"
                >
                  {access === "Admin" && <AdminPanelSettingsOutlinedIcon />}
                  {access === "Power user" && <SecurityOutlinedIcon />}
                  {access === "Basic user" && <LockOpenOutlinedIcon />}
                  <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                    {access}
                  </Typography>
                </Box>
              );
            },
          },
        ];
        return (
            <Box m="20px">
              <Header title="User Roles" subtitle="Manage User Roles" />
              <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    
                    borderBottom: "none",
                  },
                  "& .name-column--cell": {
                    color: colors.greenAccent[300],
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blue[900],
                  },
                  "& .MuiCheckbox-root": {
                    color: `${colors.white[200]} !important`,
                  },
                }}    >
                <DataGrid checkboxSelection rows={mockDataUserRoles} columns={columns} />
              </Box>
            </Box>
          );
        };
        
        export default UserRole;