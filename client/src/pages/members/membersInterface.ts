import { ChangeHandler, SubmitHandler } from "../../types/globalTypes";

export interface MemberDetails {
  project: string;
  member_name: string;
  member_email: string;
  member_role: string;
}

interface projectData {
    id: number;
    project_name: string;
}

export interface MemberProps {
    handleCreateMembers: SubmitHandler;
    members: MemberDetails;
    handleChange: ChangeHandler;
    projectsData: projectData[]
}

interface memberData {
    id: number;
    member_name: string;
    member_email: string;
    project_name: string;
    member_role: string;
}

export interface ListProps {
    myMembers: memberData[];
    handleDataChange: () => void
}
