import { ColorModeContext, useMode } from "./scenes/theme";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./scenes/global/Navbar";
import Topbar from "./scenes/global/Topbar";
import { BrowserRouter, Route, Routes, Router, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./scenes/dashboard/dashboard";
import GetEmployeeMasterData from "./scenes/EmployeeMasterData/GetEmployeeMasterData";
import UpdateEmployeeMasterData from "./scenes/EmployeeMasterData/UpdateEmployeeMasterData";
/*import EmpMD from "./scenes/empMD/index";*/
import Calendar from "./scenes/calendar/calendar";
import Bar from "../src/scenes/Charts/BarChart";
import Bar2 from "../src/scenes/Charts/bar2/BarChart";
import Pie from "./scenes/Charts/PieChart";
import Line from "./scenes/Charts/LineChart";
import CreateEmployeeMasterData from "./scenes/EmployeeMasterData/CreateEmployeeMasterData";
import Acreate from "./scenes/Attendance/Acreate";
import Aupdate from "./scenes/Attendance/Aupdate";
import Aread from "./scenes/Attendance/Aread";
import GetMarkAttendance from "./scenes/Attendance/GetMarkAttendance";
import UpdateMarkAttendance from "./scenes/Attendance/UpdateMarkAttendance";
import CreateMarkAttendance from "./scenes/Attendance/CreateMarkAttendance";
import CreateTask from "./scenes/Task/CreateTask";
import ReadTask from "./scenes/Task/ReadTask";
import UpdateTask from "./scenes/Task/UpdateTask";
import Form from "./components/Form";

/*import ProfNavbar from "./components/ProfNavbar";*/
import Intro from "./components/Intro";
import Services from "./components/Services/Services";
import CDeapartment from "./scenes/Department/CDepartment";
import ReadDepartment from "./scenes/Department/ReadDepartment";
import UpdateDepartment from "./scenes/Department/UpdateDepartment";
import CreatePermission from "../src/scenes/ApplicationUserManagement/Authorization/Permissions/CreatePermissions";
import GetPermission from "../src/scenes/ApplicationUserManagement/Authorization/Permissions/GetPermission";
import UpdatePermission from "../src/scenes/ApplicationUserManagement/Authorization/Permissions/UpdatePermission";
import CreateRoles from "../src/scenes/ApplicationUserManagement/Authorization/Roles/CreateRoles";
import GetRole from "../src/scenes/ApplicationUserManagement/Authorization/Roles/GetRole";
import UpdateRoles from "../src/scenes/ApplicationUserManagement/Authorization/Roles/UpdateRoles";
import CreateUser from "../src/scenes/ApplicationUserManagement/Users/CreateUser";
import UpdateUser from "../src/scenes/ApplicationUserManagement/Users/UpdateUser";
import GetUser from "../src/scenes/ApplicationUserManagement/Users/GetUser";
import FeedbackRating from "./scenes/Feedback360/FeedbackRating";
import KeyInsights from "../src/components/KeyInsights/KeyInsights";
// import { RequireAuth } from './components/Auth/RequireAuth';
import { isAuthenticated } from "./helper/authorizationHelper";
import { useEffect } from "react";



function App() {
  const [theme, colorMode] = useMode();
  const [isNavbar, setIsSidebar] = useState(true);
  const location = useLocation();
  const hideNavbar = location.pathname === '/' || location.pathname === '/register';
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setIsAuthorized(isAuthenticated);
  }, []);

  return (

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!hideNavbar && <Navbar isHidden={isNavbar} />}
          <main className="content">
            {!hideNavbar && <Topbar setIsSidebar={setIsSidebar} />}

            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/ProfNavabar" element={<ProfNavbar/>}/>*/}
              <Route path="/" element={<Form />} />
              <Route path="/GetEmployeeMasterData" element={<GetEmployeeMasterData />} />
              <Route path="/Intro" element={<Intro />} />
              <Route path="/Services" element={<Services />} />
              { /* <Route path="/Profile" element={<Profile />} />*/}
              <Route path="/CreateEmployeeMasterData" element={<CreateEmployeeMasterData />} />
              <Route path="/UpdateEmployeeMasterData/:id" element={<UpdateEmployeeMasterData />}></Route>
              <Route path="/Acreate" element={<Acreate />}></Route>
              <Route path="/Aupdate/:id" element={<Aupdate />}></Route>
              <Route path="/Aread" element={<Aread />}></Route>
              <Route path="/GetMarkAttendance" element={<GetMarkAttendance />}></Route>
              <Route path="/CreateMarkAttendance" element={<CreateMarkAttendance />}></Route>
              <Route path="/UpdateMarkAttendance/:id" element={<UpdateMarkAttendance />}></Route>
              <Route path="/CreateTask" element={<CreateTask />}></Route>
              <Route path="/ReadTask" element={<ReadTask />}></Route>
              <Route path="/UpdateTask/:id" element={<UpdateTask />}></Route>
              <Route path="/CDepartment" element={<CDeapartment />}></Route>
              <Route path="/ReadDepartment" element={<ReadDepartment />}></Route>
              <Route path="/UpdateDepartment/:id" element={<UpdateDepartment />}></Route>
              {/* <Route path="/CreatePermission" element={<CreatePermission />}></Route> */}
              <Route path="/GetPermission" element={<GetPermission />}></Route>
              <Route path="/UpdatePermission/:id" element={<UpdatePermission />}></Route>

              <Route path="/calendar" element={<Calendar />} />
              <Route path="/CreatePermission" element={<CreatePermission />}></Route>
              <Route path="/CreateRoles" element={<CreateRoles />}></Route>
              <Route path="/GetRole" element={<GetRole />}></Route>
              <Route path="/UpdateRoles/:id" element={<UpdateRoles />}></Route>

              <Route path="/CreateUser" element={<CreateUser />}></Route>
              <Route path="/UpdateUser/:id" element={<UpdateUser />}></Route>
              <Route path="/GetUser" element={<GetUser />}></Route>


              <Route path="/bar" element={<Bar />} />
              <Route path="/Pie" element={<Pie />} />
              <Route path="/Line" element={<Line />} />
              <Route path="/Bar2" element={<Bar2 />} />
              <Route path="/FeedbackRating" element={<FeedbackRating />} />
              <Route path="/KeyInsights" element={<KeyInsights />} />


            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
