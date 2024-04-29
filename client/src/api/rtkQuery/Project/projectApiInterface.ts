import { ProjectDetails } from "../../../pages/projects/projectsInterface";

export interface PostProjectRequest {
    project: ProjectDetails;
    token: string;
}

export interface DeleteProjectRequest {
    id: number;
    token: string;
}

export interface UpdateProjectRequest {
    id: unknown;
    project: ProjectDetails;
    token: string;
}