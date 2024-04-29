import React from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import UpdateForm from "./UpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { addProjects } from "../projectsSlice";
import { useUpdateProjectApiMutation } from "../../../api/rtkQuery/Project/projectApi";
import { useGetClientsQuery } from "../../../api/rtkQuery/Client/clientApi";
import { ProjectDetails } from "../projectsInterface";
import { ApiResponse } from "../../../interfaces/globalInterfaces";

const UpdateProject: React.FC = () => {
  const token = localStorage.getItem("token") as string;
  const project: ProjectDetails = useSelector((store: any) => store.projects);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateProjectApi] = useUpdateProjectApiMutation();
  const { data: clientsData } = useGetClientsQuery({token});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(addProjects({ ...project, [name]: value }));
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: projectData, error }: ApiResponse = await updateProjectApi({
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
