import { ChangeHandler, SubmitHandler } from "../../types/globalTypes";

export interface timesheetDetails {
  project: string;
  date: string;
  time_spent: string;
}

interface project{
    id: number;
    project_name: string;
}

export interface TimesheetProps {
    handleChange: ChangeHandler;
    handleTime: SubmitHandler
    time: timesheetDetails;
    projectsData: project[];
}

export interface HoursProps {
    handleDataChange: () => void;
    projectsData: project[];
}

interface timesheetData{
    id: number;
    project_name: string;
    date: string;
    time_spent: string;
}

export interface MyTimesheet {
    myTimesheet: timesheetData[]
    handleDataChange: () => void
}


