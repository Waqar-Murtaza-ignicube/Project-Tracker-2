import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import Company from "./components/Company";
import Clients from "./components/clients/Clients";
import Projects from "./components/projects/Projects";
import Members from "./components/members/Members";
import Timesheet from "./components/timesheet/Timesheet";
import CreateClient from "./components/clients/CreateClient";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UpdateClient from "./components/clients/UpdateClient";
import CreateProject from "./components/projects/CreateProject";
import UpdateProject from "./components/projects/UpdateProject"
import InviteMember from "./components/members/InviteMember"
import MemberSignUp from "./components/accounts/MemberSignUp";

const App = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login/" element={<Navigate to="/" />} />
        <Route path="register/" element={<Register />} />
        <Route path="membersignup/" element={<MemberSignUp />} />
        <Route
          path="company/"
          element={<ProtectedRoutes Component={Company} />}
        />
        <Route
          path="clients/"
          element={<ProtectedRoutes Component={Clients} />}
        />
        <Route path="clients/create" element={<CreateClient />} />
        <Route path="clients/update/:id" element={<UpdateClient />} />
        <Route
          path="projects/"
          element={<ProtectedRoutes Component={Projects} />}
        />
        <Route path="projects/create" element={<CreateProject />} />
        <Route path="projects/update/:id" element={<UpdateProject />} />
        <Route
          path="members/"
          element={<ProtectedRoutes Component={Members} />}
        />
        <Route path="members/invite" element={<InviteMember />} />
        <Route
          path="timesheet/"
          element={<ProtectedRoutes Component={Timesheet} />}
        />
      </Routes>
    </div>
  );
};

export default App;
