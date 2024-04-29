import { ChangeHandler, SubmitHandler } from "../../types/globalTypes";

export interface ProjectDetails {
  client: string;
  project_name: string;
  project_deadline: string;
}

interface myProjects {
  id: number;
  project_name: string;
  project_deadline: string;
}

interface ClientDetails {
    id: number;
    client_name: string;
}

export interface ProjectListProps {
    myProjects: myProjects[]
    handleDataChange: () => void
}

export interface ProjectProps {
    handleChange: ChangeHandler;
    handleCreateProject: SubmitHandler;
    project: ProjectDetails;
    clientsData: ClientDetails[];
}

export interface UpdateProjectProps {
    handleChange: ChangeHandler;
    handleUpdateProject: SubmitHandler;
    project: ProjectDetails;
    clients: ClientDetails[];
}