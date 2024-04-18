import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InviteMember = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [hasProjects, setHasProjects] = useState(false);
  const [members, setMembers] = useState({
    project: "",
    member_name: "",
    member_email: "",
    member_role: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProjects(token);
    }
  }, []);

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
      } else {
        setProjects(response.data);
        setHasProjects(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMembers({ ...members, [name]: value });
  };

  const handleCreateMembers = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const url = "http://127.0.0.1:8000/members/";
      const response = await axios.post(url, members, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      navigate("/members");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <section className="flex justify-center">
        {hasProjects && (
          <div className="p-10 m-20 shadow-2xl rounded-lg w-1/4 ">
            <h1 className="text-white text-4xl mb-7 font-semibold ">
              Invite Member
            </h1>

            <form onSubmit={handleCreateMembers}>
              <div className="flex flex-col max-w-full">
                <label className="font-normal text-white" htmlFor="member_name">
                  Member name
                </label>
                <input className="p-2 w-full rounded-sm mb-4 mt-1"
                  type="text"
                  name="member_name"
                  value={members.member_name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col max-w-full">
                <label
                  className="text-white font-normal"
                  htmlFor="member_email"
                >
                  Member email
                </label>
                <input className="p-2 w-full rounded-sm mb-4 mt-1"
                  type="email"
                  name="member_email"
                  value={members.member_email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col max-w-full">
                <label className="font-normal text-white" htmlFor="member_role">Member Role</label>
                <select className="p-3 w-full rounded-sm mb-4 mt-1 bg-white"
                  name="member_role"
                  id="member_role"
                  value={members.member_role}
                  onChange={handleChange}
                >
                  <option value="">Select a Role</option>
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              <div className="flex flex-col max-w-full">
                <label className="font-normal text-white" htmlFor="member_role">Project</label>
                <select className="p-3 w-full rounded-sm mb-6 mt-1 bg-white"
                  name="project"
                  id="project"
                  value={members.project}
                  onChange={handleChange}
                >
                  <option value="">Select a Project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.project_name}
                    </option>
                  ))}
                </select>
              </div>
              <button className="bg-blue-500 shadow-xl p-2 rounded-md text-white" type="submit">Submit</button>
            </form>
          </div>
        )}
        {!hasProjects && (
          <p className="bg-white rounded-md text-center mt-10 p-5">
            Please create some projects first to add a new member
          </p>
        )}
      </section>
    </>
  );
};

export default InviteMember;
