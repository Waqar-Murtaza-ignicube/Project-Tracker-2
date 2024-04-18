import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [hasClients, setHasClients] = useState(false);
  const [project, setProject] = useState({
    client: "",
    project_name: "",
    project_deadline: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getClients(token);
    }
  }, []);

  const getClients = async (token) => {
    try {
      const url = "http://127.0.0.1:8000/clients/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      if (response.data == "") {
        setHasClients(false);
      } else {
        setClients(response.data);
        setHasClients(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const url = "http://127.0.0.1:8000/projects/";
      const response = await axios.post(url, project, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      navigate("/projects");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <section className="flex justify-center">
        {hasClients && (
          <div className="p-10 m-20 shadow-2xl rounded-lg w-1/4 ">
            <h1 className="text-white text-4xl mb-7 font-semibold ">
              New Project
            </h1>

            <form onSubmit={handleCreateProject}>
              <div className="flex flex-col max-w-full">
                <label className="text-white font-normal" htmlFor="client">
                  Client
                </label>
                <select
                  className="p-3 w-full rounded-sm mb-4 mt-1 bg-white"
                  name="client"
                  id="client"
                  value={project.client}
                  onChange={handleChange}
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.client_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col max-w-full">
                <label
                  className="text-white font-normal"
                  htmlFor="project_name"
                >
                  Project Name
                </label>
                <input
                  className="p-2 w-full rounded-sm mb-4 mt-1"
                  type="text"
                  name="project_name"
                  value={project.project_name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col max-w-full">
                <label
                  className="text-white font-normal"
                  htmlFor="project_deadline"
                >
                  Project Deadline
                </label>
                <input
                  className="p-2 w-full rounded-sm mb-6 mt-1"
                  type="date"
                  name="project_deadline"
                  value={project.project_deadline}
                  onChange={handleChange}
                />
              </div>
              <button
                className="bg-blue-500 shadow-xl p-2 rounded-md text-white"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        )}
        {!hasClients && (
          <p className="bg-white rounded-md text-center mt-10 p-5">
            Please create some clients first to add a new project
          </p>
        )}
      </section>
    </>
  );
};

export default CreateProject;
