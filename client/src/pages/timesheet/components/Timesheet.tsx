import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import RegisterHours from "./RegisterHours";
import TrackList from "./TrackList";
import { useGetTimesheetQuery } from "../../../api/rtkQuery/Timesheet/timesheetApi";
import { useGetProjectQuery } from "../../../api/rtkQuery/Project/projectApi";

const Timesheet: React.FC = () => {
  const [isTimesheet, setIsTimesheet] = useState<boolean>(false);
  const token = localStorage.getItem("token") as string;
  
  const { data: timesheetData, error, refetch } = useGetTimesheetQuery({token});
  const { data: projectsData } = useGetProjectQuery({token});

  useEffect(() => {
    if (timesheetData == "") {
      setIsTimesheet(false);
    } else if (timesheetData) {
      setIsTimesheet(true);
    } else if (error) {
      console.log(error);
    }
    refetch();
  }, [refetch, error, timesheetData, projectsData]);

  const handleDataChange = () => {
    refetch();
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-8">
        <div className="flex justify-between mb-8">
          <h1 className="text-white text-2xl font-medium">Register Hours</h1>
        </div>
        {projectsData && (
          <RegisterHours
            handleDataChange={handleDataChange}
            projectsData={projectsData}
          />
        )}
        {isTimesheet && (
          <TrackList
            myTimesheet={timesheetData}
            handleDataChange={handleDataChange}
          />
        )}
        {!isTimesheet && (
          <p className="bg-white rounded-md text-center py-5">
            Your daily project entries will be displayed here.
          </p>
        )}
      </main>
    </>
  );
};

export default Timesheet;
