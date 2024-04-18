import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState(false)
 
  useEffect(()=>{
    const group = localStorage.getItem('group')
    if (group == 'Member'){
      setIsMember(true)
    }
  },[])

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const url = "http://127.0.0.1:8000/logout/";
      const response = await axios.post(url, null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("group");
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="container mx-auto text-white p-8">
      <nav className="flex justify-around font-medium">
        <div className="font-semibold text-3xl flex-1">
          <a href="/" className="decoration-0 "> Project Tracker</a>
        </div>
        {!isMember && <ul className="decoration-0 flex gap-x-8">
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
            <Link onClick={handleLogout}>Logout</Link>
          </li>
        </ul>}
        {isMember && <ul className="decoration-0 flex gap-x-8">
          <li>
            <Link to="/timesheet">Track</Link>
          </li>
          <li>
            <Link onClick={handleLogout}>Logout</Link>
          </li>
        </ul>}
      </nav>
    </header>
  );
};

export default Navbar;
