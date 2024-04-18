import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ProjectList from "./ProjectList"

const Projects = () => {
  const navigate = useNavigate();
  const [isProjects, setIsProjects] = useState(false);
  const [allowed, setAllowed] = useState(false)
  const [myProjects, setMyProjects] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const group = localStorage.getItem("group");
    if (group == 'Admin' && token){
      checkAuthentication(token);
    }
    else if (group == 'Member' && token){
      checkMemberAuth(token)
    }
  }, [allowed]);

  const checkAuthentication = async (token) => {
    try {
      const url = "http://127.0.0.1:8000/clients/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      if (response.data) {
        getProjects(token);
      }
    } catch {
      console.log({ error: "Please create some clients first" });
      setAllowed(true)
      navigate("/clients");
    }
  };

  const checkMemberAuth = () => {
    navigate('/timesheet')
  }

  const getProjects = async (token) => {
    try {
      const url = "http://127.0.0.1:8000/projects/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      if (response.data == "") {
        setIsProjects(false);
      } else if (response.data) {
        setMyProjects(response.data);
        setIsProjects(true);
      }
    } catch (error) {
      setIsProjects(false);
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-white text-2xl font-medium">Projects</h1>
        <Link className="bg-blue-500 shadow-xl p-2 rounded-md text-white" to="create">+ Create</Link>
      </div>
        {isProjects && (
          <ProjectList myProjects={myProjects} getProjects={getProjects} />
        )}
        {!isProjects && (
          <p className="bg-white text-center py-5 rounded-md">This view will show Projects you are responsible for</p>
        )}
      </main>
    </>
  );
}

export default Projects