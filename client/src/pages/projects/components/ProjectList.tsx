import { useNavigate } from "react-router-dom";
import { useDeleteProjectApiMutation } from "../../../api/rtkQuery/Project/projectApi";
import React from "react";
import { ProjectListProps } from "../projectsInterface";

const ProjectList: React.FC<ProjectListProps> = ({ myProjects, handleDataChange }) => {
  const navigate = useNavigate();
  const [deleteProjectApi] = useDeleteProjectApiMutation();
  const token = localStorage.getItem("token") as string;

  const deleteProjects = async (id: number) => {
    await deleteProjectApi({ token, id });
    handleDataChange();
  };

  const updateProjects = (id: number) => {
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
            <tr
              className="text-left flex justify-around py-3"
              key={project.project_name}
            >
              <td className=" w-40">{project.project_name}</td>
              <td className=" w-40">{project.project_deadline}</td>
              <td className=" w-40">
                <button
                  className="bg-blue-500 shadow-xl p-2 rounded-md text-white"
                  onClick={() => updateProjects(project.id)}
                >
                  Edit
                </button>
              </td>
              <td className=" w-40">
                <button
                  className="bg-blue-500 shadow-xl p-2 rounded-md text-white"
                  onClick={() => deleteProjects(project.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProjectList;
