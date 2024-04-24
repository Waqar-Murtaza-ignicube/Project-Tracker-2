import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import LoginIndex from "./pages/accounts/Login/index";
import RegisterIndex from "./pages/accounts/Register/index";
import CompanyIndex from "./pages/company/index";
import ClientsIndex from "./pages/clients/index";
import ProjectsIndex from "./pages/projects/index";
import MembersIndex from "./pages/members/index";
import TimesheetIndex from "./pages/timesheet/index";
import CreateClient from "./pages/clients/components/CreateClient";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UpdateClient from "./pages/clients/components/UpdateClient";
import CreateProject from "./pages/projects/components/CreateProject";
import UpdateProject from "./pages/projects/components/UpdateProject";
import InviteMember from "./pages/members/components/InviteMember";
import MemberSignUpIndex from "./pages/accounts/Member/index";

const App = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen">
      <Routes>
        <Route path="/" element={<LoginIndex />} />
        <Route path="login/" element={<Navigate to="/" />} />
        <Route path="register/" element={<RegisterIndex />} />
        <Route path="membersignup/" element={<MemberSignUpIndex />} />
        <Route
          path="company/"
          element={<ProtectedRoutes Component={CompanyIndex} />}
        />
        <Route
          path="clients/"
          element={<ProtectedRoutes Component={ClientsIndex} />}
        />
        <Route path="clients/create" element={<CreateClient />} />
        <Route path="clients/update/:id" element={<UpdateClient />} />
        <Route
          path="projects/"
          element={<ProtectedRoutes Component={ProjectsIndex} />}
        />
        <Route path="projects/create" element={<CreateProject />} />
        <Route path="projects/update/:id" element={<UpdateProject />} />
        <Route
          path="members/"
          element={<ProtectedRoutes Component={MembersIndex} />}
        />
        <Route path="members/invite" element={<InviteMember />} />
        <Route
          path="timesheet/"
          element={<ProtectedRoutes Component={TimesheetIndex} />}
        />
      </Routes>
    </div>
  );
};

export default App;
