import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectList = ({myProjects, getProjects}) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const deleteProjects = async (id) => {
    try {
      const url = `http://127.0.0.1:8000/projects/${id}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      getProjects(token);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProjects = (id) => {
    navigate(`update/${id}`);
  };

  return (
    <>
      <table className="w-full">
          <thead>
          <tr className="bg-white text-left flex justify-around rounded-md mb-8 p-5 shadow-2xl">
            <th className="w-40">Name</th>
            <th className="w-40">Project Deadline</th>
            <th className="w-40">Action</th>
            <th className="w-40">Action</th>
          </tr>
          </thead>
          <tbody className="bg-white flex flex-col rounded-md p-5 shadow-2xl">
          {myProjects.map((project) => (
            <tr className="text-left flex justify-around py-3" key={project.project_name}>
              <td className=" w-40">{project.project_name}</td>
              <td className=" w-40">{project.project_deadline}</td>
              <td className=" w-40">
                <button className="bg-blue-500 shadow-xl p-2 rounded-md text-white" onClick={() => updateProjects(project.id)}>Edit</button>
              </td>
              <td className=" w-40">
                <button className="bg-blue-500 shadow-xl p-2 rounded-md text-white" onClick={() => deleteProjects(project.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ProjectList