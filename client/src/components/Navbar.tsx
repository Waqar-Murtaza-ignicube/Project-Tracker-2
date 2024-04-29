import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePostlogoutApiMutation } from "../api/rtkQuery/Accounts/logoutApi";
import { ApiResponse } from "../interfaces/globalInterfaces";

const Navbar: React.FC = () => {
  const [isMember, setIsMember] = useState<boolean>(false);
  const token = localStorage.getItem("token") as string;
  const group = localStorage.getItem("group");

  const navigate = useNavigate();
  const [postLogoutApi] = usePostlogoutApiMutation();

  useEffect(() => {
    if (token && group == "Member") {
      setIsMember(true);
    }
  }, []);

  const handleLogout = async () => {
    const { data, error }: ApiResponse  = await postLogoutApi({token});
    if (data) {
      localStorage.removeItem("token");
      localStorage.removeItem("group");
      navigate("/");
    } else if (error) {
      console.log(error);
    }
  };

  return (
    <header className="container mx-auto text-white p-8">
      <nav className="flex justify-around font-medium">
        <div className="font-semibold text-3xl flex-1">
          <a href="/" className="decoration-0 ">
            {" "}
            Project Tracker
          </a>
        </div>
        {!isMember && (
          <ul className="decoration-0 flex gap-x-8">
            <li>
              <Link to="/clients">Clients</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/members">Team Members</Link>
            </li>
            <li>
              <Link to="/timesheet">Track</Link>
            </li>
            <li>
              <Link to='' onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        )}
        {isMember && (
          <ul className="decoration-0 flex gap-x-8">
            <li>
              <Link to="/timesheet">Track</Link>
            </li>
            <li>
              <Link to='' onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
