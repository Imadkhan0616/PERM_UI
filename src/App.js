import { ColorModeContext, useMode } from "./scenes/theme";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./scenes/global/Navbar";
import Topbar from "./scenes/global/Topbar";
import { BrowserRouter, Route, Routes, Router, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Read from "./scenes/empMD/index";
import Update from "./Update/Update";
/*import EmpMD from "./scenes/empMD/index";*/
import Calendar from "./scenes/calendar/calendar";
import Bar from "./scenes/bar";
import Bar2 from "./scenes/bar2";
import Pie from "./scenes/Pie";
import Line from "./scenes/line";
import Create from "./scenes/CreateMD/Create";
import Acreate from "./scenes/Attendance/Acreate";
import Aupdate from "./scenes/Attendance/Aupdate";
import Aread from "./scenes/Attendance/Aread";
import MAttread from "./scenes/Attendance/MAttread";
import MAttupdate from "./scenes/Attendance/MAttupdate";
import MAttcreate from "./scenes/Attendance/MAttcreate";
import CreateTask from "./scenes/Task/CreateTask";
import ReadTask from "./scenes/Task/ReadTask";
import UpdateTask from "./scenes/Task/UpdateTask";
import Form from "./components/Form";
/*import ProfNavbar from "./components/ProfNavbar";*/
import Intro from "./components/Intro";
import Services from "./components/Services/Services";
import UserRole from "./components/UserRole";
import CDeapartment from "./scenes/Department/CDepartment";
import ReadDepartment from "./scenes/Department/ReadDepartment";
import UpdateDepartment from "./scenes/Department/UpdateDepartment";
import CreatePermission from "./scenes/Authorization/Permissions/CreatePermissions";
import GetPermission from "./scenes/Authorization/Permissions/GetPermission";
import UpdatePermission from "./scenes/Authorization/Permissions/UpdatePermission";

/*import { useAuth0 } from '@auth0/auth0-react';
import Auth0ProviderWithHistory from "./components/Auth0ProviderWithHistory";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import { Auth0Provider } from '@auth0/auth0-react';*/

/*import TaskManagement from "./scenes/taskM";
import Attendance from "./scenes/Attendance";
import Departments from "./scenes/department";
import Feedback from "./scenes/feedback";*/


function App() {
  const [theme, colorMode] = useMode();
  const [isNavbar, setIsSidebar] = useState(true);
  /*const { isAuthenticated, isLoading } = useAuth0();*/
  const location = useLocation();
  const hideNavbar = location.pathname === '/' || location.pathname === '/register';

  return (

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!hideNavbar && <Navbar isHidden={isNavbar} />}
          <main className="content">
            {!hideNavbar && <Topbar setIsSidebar={setIsSidebar} />}
            { /* <Auth0ProviderWithHistory>

             <Router>
      <Auth0Provider
        domain='dev-u1te5s3mbwu4tv5f.us.auth0.com'
        clientId="8WisnLlIMF7mcWTwkxYIdtBpqIr4Ssjv"
        redirectUri={window.location.origin} >
        <Routes>   <Route path="/"   element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}  />
              <Route path="/Login" element={<Login />} />
  <PrivateRoute path="/Register" element={<Register />} />*/}
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/ProfNavabar" element={<ProfNavbar/>}/>*/}
              <Route path="/" element={<Form />} />
              <Route path="/empMD" element={<Read />} />
              <Route path="/Intro" element={<Intro />} />
              <Route path="/Services" element={<Services />} />
              { /* <Route path="/Profile" element={<Profile />} />*/}
              <Route path="/CreateMD" element={<Create />} />
              <Route path="/Update" element={<Update />}></Route>
              <Route path="/Acreate" element={<Acreate />}></Route>
              <Route path="/Aupdate" element={<Aupdate />}></Route>
              <Route path="/Aread" element={<Aread />}></Route>
              <Route path="/MAttread" element={<MAttread />}></Route>
              <Route path="/MAttcreate" element={<MAttcreate />}></Route>
              <Route path="/MAttupdate" element={<MAttupdate />}></Route>
              <Route path="/CreateTask" element={<CreateTask />}></Route>
              <Route path="/ReadTask" element={<ReadTask />}></Route>
              <Route path="/UpdateTask" element={<UpdateTask />}></Route>
              <Route path="/CDepartment" element={<CDeapartment />}></Route>
              <Route path="/ReadDepartment" element={<ReadDepartment />}></Route>
              <Route path="/UpdateDepartment/:id" element={<UpdateDepartment />}></Route>
              {/* <Route path="/CreatePermission" element={<CreatePermission />}></Route> */}
              <Route path="/GetPermission" element={<GetPermission />}></Route>
              <Route path="/UpdatePermission" element={<UpdatePermission />}></Route>


              {/* <Route path="/TaskManagement" element={<TaskManagement />} />
              <Route path="/Attendance" element={<Attendance />} />
  <Route path="/Departments" element={<Departments />} />*/}
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/CreatePermission" element={<CreatePermission />}></Route>
              <Route path="/bar" element={<Bar />} />
              <Route path="/Pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/bar2" element={<Bar2 />} />
              {/* <Route path="/Feedback" element={<Feedback />} />*/}</Routes>{/*</Auth0Provider></Router>
</Auth0ProviderWithHistory>*/}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
