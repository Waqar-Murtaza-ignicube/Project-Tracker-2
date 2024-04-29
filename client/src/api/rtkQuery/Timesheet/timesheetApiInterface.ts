import { timesheetDetails } from "../../../pages/timesheet/timesheetInterface";

export interface DeleteTimesheetRequest {
    id: number;
    token: string;
}

export interface PostTimesheetRequest {
    token: string;
    time: timesheetDetails;
}