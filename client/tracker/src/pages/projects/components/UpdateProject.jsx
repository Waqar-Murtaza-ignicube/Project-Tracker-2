import React from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useGetClientsQuery } from "../../../api/rtkQuery/Client/clientApi";
import { useUpdateProjectApiMutation } from "../../../api/rtkQuery/Project/projectApi";
import UpdateForm from "./UpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { addProjects } from "../projectsSlice";

const UpdateProject = () => {
  const token = localStorage.getItem("token");
  const project = useSelector((store)=> store.projects)

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateProjectApi] = useUpdateProjectApiMutation();
  const { data: clientsData, error } = useGetClientsQuery(token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(addProjects({ ...project, [name]: value }))
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();

    const { data: projectData, error } = await updateProjectApi({
      token,
      id,
      project,
    });
    if (projectData) {
      navigate("/projects");
    } else {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <section className="flex justify-center">
        <div className="p-10 m-20 shadow-2xl rounded-lg w-1/4 ">
          <h1 className="text-white text-4xl mb-7 font-semibold">
            Update Project
          </h1>
          <UpdateForm
            handleChange={handleChange}
            handleUpdateProject={handleUpdateProject}
            clients={clientsData}
            project={project}
          />
        </div>
      </section>
    </>
  );
};

export default UpdateProject;
