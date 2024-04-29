import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import CreateForm from "./CreateForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProjects, resetProjects } from "../projectsSlice";
import { useGetClientsQuery } from "../../../api/rtkQuery/Client/clientApi";
import { usePostProjectApiMutation } from "../../../api/rtkQuery/Project/projectApi";
import { ProjectDetails } from "../projectsInterface";

const CreateProject: React.FC = () => {
  const token = localStorage.getItem("token") as string;
  const [hasClients, setHasClients] = useState<boolean>(false);
  const project: ProjectDetails = useSelector((store: any) => store.projects);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: clientsData, error, isLoading } = useGetClientsQuery({token});
  const [postProjectApi] = usePostProjectApiMutation();

  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    } else if (clientsData == "") {
      console.log("in 2nd");
      setHasClients(false);
    } else if (clientsData) {
      setHasClients(true);
    } else if (error) {
      console.log(error);
    }
    dispatch(resetProjects());
  }, [isLoading, clientsData, error, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(addProjects({ ...project, [name]: value }));
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    await postProjectApi({ token, project });
    navigate("/projects");
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
            <CreateForm
              handleChange={handleChange}
              handleCreateProject={handleCreateProject}
              project={project}
              clientsData={clientsData}
            />
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
